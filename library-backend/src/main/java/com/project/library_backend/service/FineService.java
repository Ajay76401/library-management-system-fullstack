package com.project.library_backend.service;

import com.project.library_backend.entity.Fine;
import com.project.library_backend.exception.ResourceNotFoundException;
import com.project.library_backend.repository.FineRepository;
import com.project.library_backend.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FineService {

    private final FineRepository repo;

    private final LoanService loanService;

    public FineService(FineRepository repo, LoanService loanService) {
        this.repo = repo;
        this.loanService = loanService;
    }

    @Transactional
    public List<Fine> fines() {
        loanService.updateOverdueLoans();
        return repo.findAll();
    }

    @Transactional
    public void payFine(int id) {
        Fine fine = repo.findById(id).orElseThrow(()->
                new ResourceNotFoundException( "Fine not found with id : " + id));
        fine.setStatus("Paid");
        repo.save(fine);
    }
}
