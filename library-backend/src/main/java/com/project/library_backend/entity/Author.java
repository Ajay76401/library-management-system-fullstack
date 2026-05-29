	package com.project.library_backend.entity;


	import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import jakarta.persistence.*;
	import lombok.Data;
	import lombok.NoArgsConstructor;

	import java.util.List;

	@Entity
	@Data
	@NoArgsConstructor
	public class Author {

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		private String name;
		private String nationality;
		private String bio;
		private long bookCount ;
		@ManyToMany(mappedBy = "authors")
		@JsonIgnoreProperties("authors")
		private List<Book> books;
        private boolean active=true;

	}
