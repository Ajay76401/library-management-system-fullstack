package com.project.library_backend.service;

import com.project.library_backend.entity.Author;
import com.project.library_backend.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    AuthorRepository repo;

    public long countOfAuthors() {
        return repo.count();
    }

    public void addAuthor(Author author) {
        repo.save(author);
    }

    public void updateAuthor(int id ,Author author) {
        Author author1 = repo.findById(id).orElseThrow();
        author1.setName(author.getName());
        author1.setNationality(author.getNationality());
        author1.setBio(author.getBio());
        repo.save(author1);
    }

    public void deleteAuthor(int id) {
        repo.deleteById(id);
    }

    public List<Author> getAuthors() {
        return repo.findAll() ;
    }
}
