package com.project.library_backend.controller;

import com.project.library_backend.DTO.LoanRequest;
import com.project.library_backend.entity.Loan;
import com.project.library_backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/loans")
    public List<Loan> getLoans(){
        return service.getLoans();
    }

    @PutMapping("/returnloan/{id}")
    public void returnLoan(@PathVariable int id){
        service.returnLoan(id);
    }

    @PostMapping("/addloan")
    public void addLoan(
            @RequestBody LoanRequest request
    ){
        service.addLoan(request);
    }

}
