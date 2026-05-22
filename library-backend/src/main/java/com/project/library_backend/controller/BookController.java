package com.project.library_backend.controller;

import com.project.library_backend.DTO.BookRequest;
import com.project.library_backend.entity.Book;
import com.project.library_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    BookService service;


    @GetMapping("/books")
    public List<Book> getBooks(){
        return service.getBooks();
    }

    @PostMapping("/addbook")
    public void addBook(@RequestBody BookRequest request) {
        service.addBook(request);
    }

    @DeleteMapping("/removebook/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        try {
            service.deleteBook(id);
            return ResponseEntity.ok("Book deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    @PutMapping("/updatebook/{id}")
    public  void updateBook(@PathVariable int id , @RequestBody BookRequest bookRequest){
        service.updateBook(id,bookRequest);
    }

    @GetMapping("availablebooks")
    public List<Book> availableBooks(){
        return service.availableBooks();
    }

}
