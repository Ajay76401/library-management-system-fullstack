package com.project.library_backend.controller;

import com.project.library_backend.entity.Loan;
import com.project.library_backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class LoanController {

    @Autowired
    LoanService service;

    @GetMapping("/activeloans")
    public long countOfActiveLoans() {
        return service.countOfActiveLoans();
    }

    @GetMapping("/overdueloans")
    public List<Loan> countOfOverdueLoans() {
        return service.countOfOverdueLoans();
    }

    @GetMapping("/recentloans")
    public List<Loan> recentLoans() {
        return service.recentLoans();
    }


}
