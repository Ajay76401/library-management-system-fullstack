package com.project.library_backend.repository;

import com.project.library_backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member,Integer> {
    long countByActive(String active);

    List<Member> findByActiveTrue();
}
