package com.project.library_backend.service;

import com.project.library_backend.entity.Publisher;
import com.project.library_backend.exception.InvalidOperationException;
import com.project.library_backend.exception.ResourceNotFoundException;
import com.project.library_backend.repository.PublisherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherService {

    private final PublisherRepository repo;

    public PublisherService(PublisherRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Publisher addPublisher(Publisher p) {
        return repo.save(p);
    }

    @Transactional
    public Publisher updatePublisher(int id, Publisher p) {
        Publisher publisher = repo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Publisher not found with id : " + id));
        publisher.setName(p.getName());
        publisher.setAddress(p.getAddress());
        publisher.setPhone(p.getPhone());
        return repo.save(publisher);
    }

    @Transactional
    public void deletePublisher(int id) {
        Publisher publisher = repo.findById(id).orElseThrow(() ->
                        new ResourceNotFoundException("Publisher not found"));
        if (!publisher.getBooks().isEmpty()) {
            throw new InvalidOperationException(
                    "Publisher cannot be deleted because books are associated with it."
            );
        }
        publisher.setActive(false);
        repo.save(publisher);
    }
    public List<Publisher> getPublisher() {
        return repo.findByActiveTrue();
    }
}
