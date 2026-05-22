package com.project.library_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String email;
	private String phone;
	private LocalDate joindate;
	private String status;

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("member")
	private List<Loan> loans;

	@OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("member")
	private Account account;

	public Member(String name, String email, String phone, LocalDate joindate ,String status) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.joindate = joindate;
		this.status =status;
	}
}
