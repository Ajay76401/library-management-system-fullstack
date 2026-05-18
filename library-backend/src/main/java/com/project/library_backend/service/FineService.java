package com.project.library_backend.service;

import com.project.library_backend.entity.Fine;
import com.project.library_backend.repository.FineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FineService {

    @Autowired
    FineRepository repo;


    public List<Fine> unpaidfines() {
    return repo.findAll();
    }
}
