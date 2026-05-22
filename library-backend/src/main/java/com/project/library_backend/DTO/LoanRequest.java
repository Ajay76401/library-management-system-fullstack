package com.project.library_backend.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LoanRequest {

    private int bookId;

    private int memberId;

    private LocalDate issueDate;

    private LocalDate dueDate;
}