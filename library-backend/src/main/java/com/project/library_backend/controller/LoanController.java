package com.project.library_backend.controller;

import com.project.library_backend.DTO.LoanRequest;
import com.project.library_backend.entity.Loan;
import com.project.library_backend.service.LoanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class LoanController {


   private final LoanService service;

    public LoanController(LoanService service) {
        this.service = service;
    }

    @GetMapping("/activeloans")
    public ResponseEntity<Long> countOfActiveLoans() {
        return ResponseEntity.ok(service.countOfActiveLoans());
    }

    @GetMapping("/overdueloans")
    public ResponseEntity<List<Loan>> overdueLoans() {
        return ResponseEntity.ok(service.overdueLoans());
    }

    @GetMapping("/recentloans")
    public ResponseEntity<List<Loan>> recentLoans() {
        return ResponseEntity.ok( service.recentLoans());
    }

    @GetMapping("/loans")
    public ResponseEntity<List<Loan>> getLoans(){
        return ResponseEntity.ok(service.getLoans());
    }

    @PutMapping("/returnloan/{id}")
    public ResponseEntity<Loan> returnLoan(@PathVariable int id){
        return  ResponseEntity.ok(service.returnLoan(id));
    }

    @PostMapping("/addloan")
    public ResponseEntity<Loan> addLoan(@RequestBody LoanRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addLoan(request));
    }

}
