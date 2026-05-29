package com.project.library_backend.controller;

import com.project.library_backend.DTO.BookRequest;
import com.project.library_backend.entity.Book;
import com.project.library_backend.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class BookController {


    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(service.getBooks());
    }

    @GetMapping("/countofbooks")
    public ResponseEntity<Long> countOfBook(){
        return ResponseEntity.ok(service.countOfBooks());
    }

    @PostMapping("/addbook")
    public ResponseEntity<Book> addBook(@RequestBody BookRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addBook(request));
    }

    @DeleteMapping("/removebook/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable int id) {
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updatebook/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable int id, @RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(service.updateBook(id,bookRequest));
    }

    @GetMapping("availablebooks")
    public ResponseEntity<List<Book>> availableBooks() {
        return ResponseEntity.ok(service.availableBooks());

    }
    @GetMapping("/availablebookscount")
    public ResponseEntity<Long> books(){
        return ResponseEntity.ok(service.availableBooksCount());
    }


}
