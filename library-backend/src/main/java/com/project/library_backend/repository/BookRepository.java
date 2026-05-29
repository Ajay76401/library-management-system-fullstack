package com.project.library_backend.repository;

import com.project.library_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
     List<Book> findByActive(boolean b);

    List<Book> findByActiveTrue();
}
