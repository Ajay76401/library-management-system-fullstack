package com.project.library_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Bookcopies {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String status;

	@ManyToOne
	@JoinColumn(name = "book_id")
	@JsonIgnoreProperties("bookCopies")
	private Book book;

	@OneToMany(mappedBy = "bookcopy")
	@JsonIgnore
	private List<Loan> loans;

}
