package com.project.library_backend.controller;

import com.project.library_backend.entity.Fine;
import com.project.library_backend.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/")
public class FineController {

    @Autowired
    FineService service;

    @GetMapping("/fines")
    public List<Fine> fines() {
        return service.fines();
    }

    @PutMapping("/payfine/{id}")
    public void payFine(@PathVariable int id){
        service.payFine(id);
    }


}
