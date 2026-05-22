package com.project.library_backend.service;

import com.project.library_backend.entity.Member;
import com.project.library_backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    @Autowired
    MemberRepository repo;

    public long countOfMember() {
        return repo.count();
    }

    public List<Member> getMember() {
        return repo.findAll();
    }

    public void updateMember(int id,Member member) {
        Member member1 = repo.findById(id).orElseThrow();
        member1.setName(member.getName());
        member1.setEmail(member.getEmail());
        member1.setPhone(member.getPhone());
        member1.setStatus(member.getStatus());
        repo.save(member1);
    }

    public void deleteMember(int id) {
        Member member =
                repo.findById(id).orElseThrow();
        if (!member.getLoans().isEmpty()) {
            throw new RuntimeException(
                    "Cannot delete member with loan history."
            );
        }
        repo.delete(member);
    }

    public void addMember(Member member) {
        repo.save(member);
    }

    public List<Member> activemembers() {
        List<Member> all = repo.findAll();
        return all.stream().filter(member ->  member.getStatus().equalsIgnoreCase("active"))
                .toList();
    }
}
