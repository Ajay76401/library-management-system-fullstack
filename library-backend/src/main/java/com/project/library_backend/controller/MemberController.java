package com.project.library_backend.controller;

import com.project.library_backend.entity.Member;
import com.project.library_backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    @Autowired
    MemberService service;

    @GetMapping("/countofmembers")
    public long countOfMember() {
        return service.countOfMember();
    }

    @GetMapping("/members")
    public List<Member> getMembers() {
        return service.getMember();
    }

    @PutMapping("/updatemember/{id}")
    public void updateMember(@PathVariable int id, @RequestBody Member member) {
        service.updateMember(id, member);
    }

    @DeleteMapping("/removemember/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable int id) {
        try {
            service.deleteMember(id);
            return ResponseEntity.ok("Member deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/addmember")
    public void addMember(@RequestBody Member member){
       service.addMember(member);
    }

    @GetMapping("/activemembers")
    public List<Member> activeMembers(){
        return service.activemembers();
    }
}
