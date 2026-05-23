package com.project.library_backend.controller;

import com.project.library_backend.entity.Fine;
import com.project.library_backend.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/")
public class FineController {


   private final FineService service;

    public FineController(FineService service) {
        this.service = service;
    }

    @GetMapping("/fines")
    public ResponseEntity<List<Fine>> fines() {
        return ResponseEntity.ok(service.fines());
    }

    @PutMapping("/payfine/{id}")
    public ResponseEntity<Void> payFine(@PathVariable int id) {
        service.payFine(id);
        return ResponseEntity.noContent().build();
    }


}
