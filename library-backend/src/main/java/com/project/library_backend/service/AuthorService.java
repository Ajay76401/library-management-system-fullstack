package com.project.library_backend.service;

import com.project.library_backend.entity.Author;
import com.project.library_backend.exception.ResourceNotFoundException;
import com.project.library_backend.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {


   private final AuthorRepository repo;

   public AuthorService(AuthorRepository repo){
       this.repo=repo;
   }

    public long countOfAuthors() {
        return repo.count();
    }

    public Author addAuthor(Author author) {
        return repo.save(author);
    }

    public Author updateAuthor(int id, Author author) {
        Author author1 = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Author not found with id : " + id));
        author1.setName(author.getName());
        author1.setNationality(author.getNationality());
        author1.setBio(author.getBio());
        return repo.save(author1);
    }

    public void deleteAuthor(int id) {
        Author author = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Author not found with id : " + id));
        repo.delete(author);
    }

    public List<Author> getAuthors() {
        return repo.findAll();
    }
}
