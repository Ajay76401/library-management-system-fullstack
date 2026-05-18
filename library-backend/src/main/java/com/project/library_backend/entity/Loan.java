package com.project.library_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
public class Loan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private LocalDate issuedate;
	private LocalDate duedate;
	private LocalDate returndate;
	private String status;

	@ManyToOne
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("loans")
	private Member member;

	@OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Fine> fines;

	@ManyToOne
	@JoinColumn(name = "bookCopy_id")
	@JsonIgnoreProperties("loans")
	private Bookcopies bookcopy;

}
