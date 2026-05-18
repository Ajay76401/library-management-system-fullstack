package com.project.library_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private int yop;
	private double price;
	@ManyToOne
	@JoinColumn(name = "publisher_id")
	private Publisher publisher;

	@ManyToMany(mappedBy = "books")
	@JsonIgnore
	private List<Author> authors;

	@OneToMany(mappedBy = "book")
	@JsonIgnore
	private List<Bookcopies> bookCopies;

	public Book(String title, int yop, double price) {
		super();
		this.title = title;
		this.yop = yop;
		this.price = price;
	}

	public Book(String title, int yop, double price, Publisher publisher) {
		super();
		this.title = title;
		this.yop = yop;
		this.price = price;
		this.publisher = publisher;
	}
}
