package com.project.library_backend.service;

import com.project.library_backend.entity.Fine;
import com.project.library_backend.repository.FineRepository;
import com.project.library_backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FineService {

    @Autowired
    FineRepository repo;

    @Autowired
    LoanService loanService;

    public List<Fine> fines() {
        loanService.updateOverdueLoans();
        return repo.findAll();
    }

    public void payFine(int id) {
        Fine fine = repo.findById(id).orElseThrow();
        fine.setStatus("Paid");
        repo.save(fine);
    }
}
