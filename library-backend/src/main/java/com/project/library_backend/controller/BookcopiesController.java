package com.project.library_backend.controller;

import com.project.library_backend.service.BookcopiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class BookcopiesController {

    @Autowired
    BookcopiesService service ;

    @GetMapping("/countofbooks")
    public Long countOfBook(){
      return service.countOfBooks();
    }

    @GetMapping("/availablebookscount")
    public long books(){
        return service.availablebookscount();
    }



}

