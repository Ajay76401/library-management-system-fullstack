package com.project.library_backend.service;

import com.project.library_backend.entity.Account;
import com.project.library_backend.entity.Role;
import com.project.library_backend.repository.AccountRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    public AccountService(
            AccountRepository accountRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.accountRepository = accountRepository;

        this.passwordEncoder = passwordEncoder;
    }

    public void register(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setRole(Role.LIBRARIAN);
        accountRepository.save(account);
    }
}