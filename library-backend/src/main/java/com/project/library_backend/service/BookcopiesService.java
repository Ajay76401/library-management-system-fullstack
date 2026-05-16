package com.project.library_backend.service;

import com.project.library_backend.repository.BookcopiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookcopiesService {

    @Autowired
    public BookcopiesRepository repo ;
    public Long countOfBooks(){
        return repo.count();
    }

    public long availablebookscount() {
        return repo.countByStatus("available") ;
    }
}
