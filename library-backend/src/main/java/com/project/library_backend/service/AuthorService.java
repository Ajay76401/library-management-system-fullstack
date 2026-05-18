package com.project.library_backend.service;

import com.project.library_backend.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {

    @Autowired
    AuthorRepository repo;

    public long countOfAuthors() {
        return repo.count();
    }
}
