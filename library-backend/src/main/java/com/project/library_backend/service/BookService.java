package com.project.library_backend.service;

import com.project.library_backend.DTO.BookRequest;
import com.project.library_backend.entity.Author;
import com.project.library_backend.entity.Book;
import com.project.library_backend.entity.Bookcopies;
import com.project.library_backend.entity.Publisher;
import com.project.library_backend.exception.InvalidOperationException;
import com.project.library_backend.exception.ResourceNotFoundException;
import com.project.library_backend.repository.AuthorRepository;
import com.project.library_backend.repository.BookRepository;
import com.project.library_backend.repository.BookcopiesRepository;
import com.project.library_backend.repository.PublisherRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private final BookRepository repo;

    private final AuthorRepository authorRepo;

    private final PublisherRepository publisherRepo;

    private final BookcopiesRepository bookCopiesRepo;

    public BookService(BookRepository repo, AuthorRepository authorRepo, PublisherRepository publisherRepo, BookcopiesRepository bookCopiesRepo) {
        this.repo = repo;
        this.authorRepo = authorRepo;
        this.publisherRepo = publisherRepo;
        this.bookCopiesRepo = bookCopiesRepo;
    }
    @Transactional
    public Book addBook(BookRequest request) {
        Author author = authorRepo.findById(request.getAuthorId()).orElseThrow(()->
                new ResourceNotFoundException(("Author not found with id : " + request.getAuthorId())));
        Publisher publisher = publisherRepo.findById(request.getPublisherId()).orElseThrow(()->
                new ResourceNotFoundException(("Publisher not found with id : " + request.getPublisherId())));
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

        return savedBook;
    }
    @Transactional
    public void deleteBook(int id) {
        Book book = repo.findById(id).orElseThrow(()->new ResourceNotFoundException(("Book not found with id : " + id)));
        boolean hasLoanedCopies = book.getBookCopies().stream().anyMatch(copy -> copy.getStatus().equalsIgnoreCase("Loaned"));
        if (hasLoanedCopies) {
            throw new InvalidOperationException(
                    "Cannot delete book. Some copies are currently loaned."
            );
        }
        book.setActive(false);
        repo.save(book);
    }
    @Transactional
    public Book updateBook(int id, BookRequest bookRequest) {
        Book book1 = repo.findById(id).orElseThrow(()->
                new ResourceNotFoundException(("Book not found with id : " + id)));
        book1.setTitle(bookRequest.getTitle());
        book1.setYop(bookRequest.getYop());
        book1.setIsbn(bookRequest.getIsbn());
        book1.setCategory(bookRequest.getCategory());

        Author author = authorRepo.findById(bookRequest.getAuthorId()).orElseThrow(()->
                new ResourceNotFoundException(("Author not found with id : " + bookRequest.getAuthorId())));

        Publisher publisher = publisherRepo.findById(bookRequest.getPublisherId()).orElseThrow(()->
                new ResourceNotFoundException(("Publisher not found with id : " + bookRequest.getPublisherId())));
        book1.setPublisher(publisher);
        book1.setAuthors(new ArrayList<>(List.of(author)));
        return repo.save(book1);
    }

    public List<Book> getBooks() {
        return repo.findByActiveTrue();
    }

    public List<Book> availableBooks() {
        List<Book> all = repo.findByActive(true);
        return all.stream().filter(book -> book.getBookCopies().stream().anyMatch(copy -> copy.getStatus()
                .equalsIgnoreCase("Available"))).toList();
    }

    public long countOfBooks(){
        List<Book> byActive = repo.findByActive(true);
       return  byActive.stream().flatMap(book-> book.getBookCopies().stream()).count();
    }

    public long availableBooksCount() {
        return repo.findByActive(true)
                .stream()
                .flatMap(book -> book.getBookCopies().stream())
                .filter(copy ->
                        copy.getStatus().equalsIgnoreCase("Available"))
                .count();
    }
}
