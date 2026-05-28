package com.project.library_backend.controller;

import com.project.library_backend.entity.Author;
import com.project.library_backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class AuthorController {


    private final AuthorService service;

    public AuthorController(AuthorService service) {
        this.service = service;
    }

    @GetMapping("/countofauthors")
    public ResponseEntity<Long> countOfAuthors() {
        return ResponseEntity.ok(service.countOfAuthors());
    }

    @PostMapping("/addauthor")
    public ResponseEntity<Author> addAuthor(@RequestBody Author author) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addAuthor(author));
    }

    @PutMapping("/updateauthor/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable int id, @RequestBody Author author) {
        return ResponseEntity.ok(service.updateAuthor(id, author));
    }

    @DeleteMapping("removeauthor/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable int id) {
        service.deleteAuthor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("authors")
    public ResponseEntity<List<Author>> getAuthors() {
        return ResponseEntity.ok(service.getAuthors());
    }
}
