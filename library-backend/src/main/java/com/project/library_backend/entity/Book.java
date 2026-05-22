package com.project.library_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

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
	private String isbn;
	private String category;

	@ManyToOne
	@JoinColumn(name = "publisher_id")
	private Publisher publisher;

	@ManyToMany
	@JoinTable(
			name = "author_book",
			joinColumns = @JoinColumn(name = "book_id"),
			inverseJoinColumns = @JoinColumn(name = "author_id")
	)
	@JsonIgnoreProperties("books")
	private List<Author> authors;

	@OneToMany(mappedBy = "book")
	@JsonIgnoreProperties("book")
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
