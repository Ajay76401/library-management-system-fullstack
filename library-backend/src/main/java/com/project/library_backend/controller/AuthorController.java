package com.project.library_backend.controller;

import com.project.library_backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthorController {

    @Autowired
    AuthorService service;

    @GetMapping("/countofauthors")
    public long countOfAuthors(){
     return service.countOfAuthors();
    }


}
