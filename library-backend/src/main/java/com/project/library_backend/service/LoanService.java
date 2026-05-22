package com.project.library_backend.service;

import com.project.library_backend.DTO.LoanRequest;
import com.project.library_backend.entity.*;
import com.project.library_backend.repository.*;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class LoanService {

    @Autowired
    LoanRepository repo;

    @Autowired
    BookcopiesRepository bookCopiesRepo;

    @Autowired
    BookRepository bookRepo;

    @Autowired
    MemberRepository memberRepo;

    @Autowired
    FineRepository fineRepo;

    public long countOfActiveLoans() {
        return repo.countByStatusIn(List.of("Issued", "Overdue"));
    }

    public List<Loan> countOfOverdueLoans() {
        return repo.findByStatus("Overdue");
    }

    public List<Loan> recentLoans() {
        List<Loan> loans = repo.findAll();
        Collections.sort(loans, new MyComparator());
        return loans;
    }

    public List<Loan> getLoans() {
        updateOverdueLoans();
        return repo.findAll();
    }
    public void returnLoan(int id) {

        Loan loan = repo.findById(id).orElseThrow();
        // set return date
        loan.setReturndate(LocalDate.now());
        // update status
        loan.setStatus("Returned");
        // update copy status
        Bookcopies copy = loan.getBookcopy();

        copy.setStatus("Available");
        repo.save(loan);
        bookCopiesRepo.save(copy);
    }

    public void addLoan(@NonNull LoanRequest request) {
        Member member = memberRepo.findById(request.getMemberId()).orElseThrow();
        Book book = bookRepo.findById(request.getBookId()).orElseThrow();
        Bookcopies copy = book.getBookCopies().stream()
                .filter(c -> c.getStatus().equals("Available"))
                .findFirst().orElseThrow(() -> new RuntimeException("No copies available"));

        copy.setStatus("Loaned");
        Loan loan = new Loan();
        loan.setBookcopy(copy);
        loan.setMember(member);
        loan.setIssuedate(request.getIssueDate());
        loan.setDuedate(request.getDueDate());
        loan.setStatus("Issued");
        bookCopiesRepo.save(copy);
        repo.save(loan);
    }

    public void updateOverdueLoans() {
        List<Loan> all = repo.findAll();
        for (Loan loan : all) {
            if (!loan.getStatus().equals("Returned")) {
                if (LocalDate.now().isAfter(loan.getDuedate())) {
                    loan.setStatus("Overdue");
                    long days = ChronoUnit.DAYS.between(loan.getDuedate(), LocalDate.now());
                    double amount = days * 1;
                    Fine fine;
                    if (loan.getFine() != null ) {
                        fine = loan.getFine();
                    } else {
                        fine = new Fine();
                        fine.setLoan(loan);
                    }
                    fine.setAmount(amount);
                    if(fine.getStatus() == null) {
                        fine.setStatus("Unpaid");
                    }
                    fineRepo.save(fine);
                } else {
                    loan.setStatus("Issued");
                }
                repo.save(loan);
            }
        }
    }
}

class MyComparator implements Comparator<Loan> {
    @Override
    public int compare(Loan o1, Loan o2) {
        LocalDate date1 = o1.getIssuedate();
        LocalDate date2 = o2.getIssuedate();
        return date2.compareTo(date1);
    }
}

