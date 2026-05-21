package com.project.library_backend.controller;

import com.project.library_backend.entity.Publisher;
import com.project.library_backend.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins =  "http://localhost:5173")
public class PublisherController {

    @Autowired
    private PublisherService service;

    @PostMapping("/addpublisher")
    public Publisher addPublisher(@RequestBody Publisher p){
       return service.addPublisher(p);
    }

    @PutMapping("/updatepublisher/{id}")
    public Publisher updatePublisher(@PathVariable int id ,@RequestBody Publisher p){
        return service.updatePublisher(id,p);
    }

    @DeleteMapping("removepublisher/{id}")
    public void removePublisher(@PathVariable int id){
        service.removePublisher( id);
    }

    @GetMapping("publishers")
    public List<Publisher> getpublisher(){
      return service.getPublisher();
    }


}
