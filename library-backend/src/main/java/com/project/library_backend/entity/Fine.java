package com.project.library_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@Entity
public class Fine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private double amount;
	private LocalDate finedate;
	private String status;

//	ISSUED,
//	RETURNED,
//	OVERDUE,
//	LOST,
//	DAMAGED

	@OneToOne
	@JoinColumn(name = "loan_id")
	private Loan loan;

}
