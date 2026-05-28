package com.project.library_backend.controller;

import com.project.library_backend.entity.Member;
import com.project.library_backend.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class MemberController {


   private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping("/countofmembers")
    public ResponseEntity<Long> countOfMember() {
        return ResponseEntity.ok(service.countOfMember());
    }

    @GetMapping("/members")
    public ResponseEntity<List<Member>> getMembers() {
        return ResponseEntity.ok(service.getMember());
    }

    @PutMapping("/updatemember/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable int id, @RequestBody Member member) {
        return  ResponseEntity.ok(service.updateMember(id, member));
    }

    @DeleteMapping("/removemember/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable int id) {
        service.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addmember")
    public ResponseEntity<Member> addMember(@RequestBody Member member){
       return ResponseEntity.status(HttpStatus.CREATED).body(service.addMember(member));
    }

    @GetMapping("/activemembers")
    public ResponseEntity<List<Member>> activeMembers(){
        return ResponseEntity.ok(service.activemembers());
    }
}
