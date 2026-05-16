package com.project.library_backend.service;

import com.project.library_backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberRepository repo;

    public long countOfMember() {
        return repo.count();
    }
}
