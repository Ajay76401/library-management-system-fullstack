package com.project.library_backend.controller;

import com.project.library_backend.service.BookcopiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "library-management-system-fullstack-woad.vercel.app")
public class BookcopiesController {


   private final BookcopiesService service ;

    public BookcopiesController(BookcopiesService service) {
        this.service = service;
    }


    @GetMapping("/countofbooks")
    public ResponseEntity<Long> countOfBook(){
        return ResponseEntity.ok(service.countOfBooks());
    }

    @GetMapping("/availablebookscount")
    public ResponseEntity<Long> books(){
        return ResponseEntity.ok(service.availableBooksCount());
    }



}

