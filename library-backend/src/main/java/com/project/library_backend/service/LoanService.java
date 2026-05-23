package com.project.library_backend.service;

import com.project.library_backend.DTO.LoanRequest;
import com.project.library_backend.entity.*;
import com.project.library_backend.exception.InvalidOperationException;
import com.project.library_backend.exception.ResourceNotFoundException;
import com.project.library_backend.repository.*;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LoanService {

    private final LoanRepository repo;

    private final BookcopiesRepository bookCopiesRepo;

    private final BookRepository bookRepo;

    private final MemberRepository memberRepo;

    private final FineRepository fineRepo;

    public LoanService(LoanRepository repo, BookcopiesRepository bookCopiesRepo, BookRepository bookRepo, MemberRepository memberRepo, FineRepository fineRepo) {
        this.repo = repo;
        this.bookCopiesRepo = bookCopiesRepo;
        this.bookRepo = bookRepo;
        this.memberRepo = memberRepo;
        this.fineRepo = fineRepo;
    }

    public long countOfActiveLoans() {
        return repo.countByStatusIn(List.of("Issued", "Overdue"));
    }

    public List<Loan> overdueLoans() {
        return repo.findByStatus("Overdue");
    }

    public List<Loan> recentLoans() {
        return repo.findAll().stream().sorted((l1, l2) -> l2.getIssuedate().compareTo(l1.getIssuedate())).toList();
    }

    @Transactional
    public List<Loan> getLoans() {
        updateOverdueLoans();
        return repo.findAll();
    }

    @Transactional
    public Loan returnLoan(int id) {
        Loan loan = repo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Loan not found with id : " + id));
        if (loan.getStatus().equalsIgnoreCase("Returned")) {
            throw new InvalidOperationException("Loan already returned");
        }

        loan.setReturndate(LocalDate.now());
        loan.setStatus("Returned");
        Bookcopies copy = loan.getBookcopy();
        copy.setStatus("Available");
        Loan save = repo.save(loan);
        bookCopiesRepo.save(copy);
        return save;
    }

    @Transactional
    public Loan addLoan(@NonNull LoanRequest request) {
        Member member = memberRepo.findById(request.getMemberId()).orElseThrow(() ->
                new ResourceNotFoundException("Member not found with id : " + request.getMemberId()));

        Book book = bookRepo.findById(request.getBookId()).orElseThrow(() ->
                new ResourceNotFoundException("Book not found with id : " + request.getBookId()));

        Bookcopies copy = book.getBookCopies().stream()
                .filter(c -> c.getStatus().equalsIgnoreCase("Available"))
                .findFirst().orElseThrow(() -> new InvalidOperationException(
                        "No copies available for this book"));

        copy.setStatus("Loaned");
        Loan loan = new Loan();
        loan.setBookcopy(copy);
        loan.setMember(member);
        loan.setIssuedate(request.getIssueDate());
        loan.setDuedate(request.getDueDate());
        loan.setStatus("Issued");
        bookCopiesRepo.save(copy);
        return repo.save(loan);
    }

    @Transactional
    public void updateOverdueLoans() {
        List<Loan> all = repo.findAll();
        for (Loan loan : all) {
            if (!loan.getStatus().equalsIgnoreCase("Returned")) {
                if (LocalDate.now().isAfter(loan.getDuedate())) {
                    loan.setStatus("Overdue");
                    long days = ChronoUnit.DAYS.between(loan.getDuedate(), LocalDate.now());
                    double amount = days * 1;
                    Fine fine;
                    if (loan.getFine() != null) {
                        fine = loan.getFine();
                    } else {
                        fine = new Fine();
                        fine.setLoan(loan);
                    }
                    fine.setAmount(amount);
                    if (fine.getStatus() == null) {
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
