package com.project.library_backend.controller;

import com.project.library_backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    @Autowired
    MemberService service ;

    @GetMapping("/countofmembers")
    public long countOfMember(){
       return service.countOfMember();
    }
}
