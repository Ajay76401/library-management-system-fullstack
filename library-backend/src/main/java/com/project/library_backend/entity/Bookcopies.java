package com.project.library_backend.entity;

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
	private Book book;

	@OneToMany(mappedBy = "bookcopy")
	private List<Loan> loans;

}
