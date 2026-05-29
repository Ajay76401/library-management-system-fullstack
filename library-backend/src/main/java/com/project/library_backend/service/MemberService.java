package com.project.library_backend.service;

import com.project.library_backend.entity.Member;
import com.project.library_backend.exception.InvalidOperationException;
import com.project.library_backend.exception.ResourceNotFoundException;
import com.project.library_backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {


    private final MemberRepository repo;

    public MemberService(MemberRepository repo) {
        this.repo = repo;
    }

    public long countOfMember() {
        return repo.countByActive("Active");
    }

    public List<Member> getMember() {
        return repo.findByActiveTrue();
    }

    @Transactional
    public Member updateMember(int id, Member member) {
        Member member1 = repo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Member not found with id : " +id));
        member1.setName(member.getName());
        member1.setEmail(member.getEmail());
        member1.setPhone(member.getPhone());
        member1.setStatus(member.getStatus());
        return repo.save(member1);
    }

    @Transactional
    public void deleteMember(int id) {
        Member member = repo.findById(id).orElseThrow(() ->
                        new ResourceNotFoundException("Member not found with id : " +id));
        boolean hasActiveLoans = member.getLoans()
                .stream()
                .anyMatch(loan ->
                        !loan.getStatus()
                                .equalsIgnoreCase("Returned"));

        if (hasActiveLoans) {
            throw new InvalidOperationException(
                    "Cannot delete member with active loans."
            );
        }
       member.setStatus("Suspended");
        repo.save(member);
    }

    @Transactional
    public Member addMember(Member member) {
        return repo.save(member);
    }

    public List<Member> activemembers() {
        List<Member> all = repo.findAll();
        return all.stream().filter(member -> member.getStatus().equalsIgnoreCase("active"))
                .toList();
    }
}
