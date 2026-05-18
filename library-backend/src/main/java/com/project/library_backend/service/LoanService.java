package com.project.library_backend.service;

import com.project.library_backend.entity.Loan;
import com.project.library_backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class LoanService {

    @Autowired
    LoanRepository repo;

    public long countOfActiveLoans() {
        return repo.countByStatusIn(List.of("ISSUED" ,"OVERDUE"));
    }

    public List<Loan> countOfOverdueLoans() {
       return repo.findByStatus("OVERDUE") ;
    }

    public List<Loan> recentLoans() {
        List<Loan> loans = repo.findAll();
        Collections.sort(loans ,new MyComparator() );
         return loans;
    }
}
class MyComparator implements Comparator<Loan>{

    @Override
    public int compare(Loan o1, Loan o2) {
        LocalDate date1 = o1.getIssuedate();
        LocalDate date2 = o2.getIssuedate();
        return date2.compareTo(date1);
    }
}

