package com.project.library_backend.repository;

import com.project.library_backend.entity.Bookcopies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookcopiesRepository extends JpaRepository <Bookcopies,Integer>{
    long countByStatus(String status);
}
