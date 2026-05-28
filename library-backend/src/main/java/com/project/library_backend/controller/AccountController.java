package com.project.library_backend.controller;

import com.project.library_backend.entity.Account;
import com.project.library_backend.repository.AccountRepository;

import com.project.library_backend.service.AccountService;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    private final AccountService accountService;

    public AccountController(
            AccountService accountService
    ) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Account account){
        accountService.register(account);
        return ResponseEntity.ok(
                "Registered Successfully"
        );
    }
}