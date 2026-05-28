package com.project.library_backend.controller;

import com.project.library_backend.entity.Publisher;
import com.project.library_backend.service.PublisherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class PublisherController {


    private final PublisherService service;

    public PublisherController(PublisherService service) {
        this.service = service;
    }

    @PostMapping("/addpublisher")
    public ResponseEntity<Publisher> addPublisher(@RequestBody Publisher p){
       return ResponseEntity.status(HttpStatus.CREATED).body( service.addPublisher(p));
    }

    @PutMapping("/updatepublisher/{id}")
    public ResponseEntity<Publisher>  updatePublisher(@PathVariable int id ,@RequestBody Publisher p){
        return ResponseEntity.ok(service.updatePublisher(id,p));
    }

    @DeleteMapping("removepublisher/{id}")
    public ResponseEntity<Void> removePublisher(@PathVariable int id){
        service.removePublisher( id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("publishers")
    public ResponseEntity<List<Publisher>> getpublisher(){
      return ResponseEntity.ok( service.getPublisher());
    }


}
