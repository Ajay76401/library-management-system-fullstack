package com.project.library_backend.controller;

import com.project.library_backend.entity.Author;
import com.project.library_backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthorController {

    @Autowired
    AuthorService service;

    @GetMapping("/countofauthors")
    public long countOfAuthors() {
        return service.countOfAuthors();
    }

    @PostMapping("/addauthor")
    public void addAuthor(@RequestBody Author author) {
        service.addAuthor(author);
    }

    @PutMapping("/updateauthor/{id}")
    public void updateAuthor(@PathVariable int id, @RequestBody Author author) {
        service.updateAuthor(id, author);
    }

    @DeleteMapping("removeauthor/{id}")
    public  void deleteAuthor(@PathVariable int id ){
        service.deleteAuthor(id);
    }

    @GetMapping("authors")
    public List<Author> getAuthors(){
        return service.getAuthors();
    }
}
