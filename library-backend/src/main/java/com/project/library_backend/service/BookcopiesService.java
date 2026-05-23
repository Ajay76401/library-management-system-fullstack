package com.project.library_backend.service;

import com.project.library_backend.repository.BookcopiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookcopiesService {

    private final BookcopiesRepository repo ;

    public BookcopiesService(BookcopiesRepository repo) {
        this.repo = repo;
    }

    public long countOfBooks(){
        return repo.count();
    }

    public long availableBooksCount() {
        return repo.countByStatus("Available") ;
    }
}
