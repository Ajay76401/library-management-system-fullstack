package com.project.library_backend.service;

import com.project.library_backend.DTO.BookRequest;
import com.project.library_backend.entity.Author;
import com.project.library_backend.entity.Book;
import com.project.library_backend.entity.Bookcopies;
import com.project.library_backend.entity.Publisher;
import com.project.library_backend.repository.AuthorRepository;
import com.project.library_backend.repository.BookRepository;
import com.project.library_backend.repository.BookcopiesRepository;
import com.project.library_backend.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    BookRepository repo;

    @Autowired
    AuthorRepository authorRepo;

    @Autowired
    PublisherRepository publisherRepo;

    @Autowired
    BookcopiesRepository bookCopiesRepo;

    public void addBook(BookRequest request) {
        Author author = authorRepo.findById(request.getAuthorId()).orElseThrow();
        author.setBookCount(author.getBookCount() + 1);
        Publisher publisher = publisherRepo.findById(request.getPublisherId()).orElseThrow();
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setYop(request.getYop());
        book.setPrice(request.getPrice());
        book.setIsbn(request.getIsbn());
        book.setCategory(request.getCategory());
        book.setPublisher(publisher);
        book.setAuthors(new ArrayList<>(List.of(author)));
        Book savedBook = repo.save(book);

        List<Bookcopies> copies = new ArrayList<>();
        for (int i = 0; i < request.getTotalCopies(); i++) {
            Bookcopies copy = new Bookcopies();
            copy.setStatus("Available");
            copy.setBook(savedBook);
            copies.add(copy);
        }
        bookCopiesRepo.saveAll(copies);
    }

    public void deleteBook(int id) {
        Book book = repo.findById(id).orElseThrow();
        boolean hasLoanedCopies = book.getBookCopies().stream().anyMatch(copy -> copy.getStatus().equalsIgnoreCase("Loaned"));
        if (hasLoanedCopies) {
            throw new IllegalStateException(
                    "Cannot delete book. Some copies are currently loaned."
            );
        }
        bookCopiesRepo.deleteAll(book.getBookCopies());
        repo.delete(book);
    }

    public void updateBook(int id, BookRequest bookRequest) {
        Book book1 = repo.findById(id).orElseThrow();
        book1.setTitle(bookRequest.getTitle());
        book1.setYop(bookRequest.getYop());
        book1.setIsbn(bookRequest.getIsbn());
        book1.setCategory(bookRequest.getCategory());

        Author author = authorRepo.findById(bookRequest.getAuthorId()).orElseThrow();
        Publisher publisher = publisherRepo.findById(bookRequest.getPublisherId()).orElseThrow();
        book1.setPublisher(publisher);
        book1.setAuthors(new ArrayList<>(List.of(author)));
        repo.save(book1);
    }

    public List<Book> getBooks() {
        return repo.findAll();
    }
}
