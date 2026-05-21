package com.project.library_backend.DTO;

import lombok.Data;

@Data
public class BookRequest {

    private String title;
    private int yop;
    private double price;
    private String isbn;
    private String category;
    private int totalCopies;
    private int publisherId;
    private int authorId;
}