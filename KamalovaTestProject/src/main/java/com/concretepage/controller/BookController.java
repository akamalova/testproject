package com.concretepage.controller;

import com.concretepage.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.concretepage.service.IBookService;
import java.util.List;

@Controller
@RequestMapping("user")
@CrossOrigin(origins = {"http://localhost:4200"})
public class BookController {

    @Autowired
    private IBookService bookService;

    @GetMapping("book")
    public ResponseEntity<Book> getBookById(@RequestParam("id") String id) {
        Book book = bookService.getBookById(Integer.parseInt(id));
        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }

    @GetMapping("all-books")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> list = bookService.getAllBooks();
        return new ResponseEntity<List<Book>>(list, HttpStatus.OK);
    }

    @PostMapping("book")
    public ResponseEntity<Void> createBook(@RequestBody Book book, UriComponentsBuilder builder) {
        boolean flag = bookService.createBook(book);
        if (!flag) return new ResponseEntity<Void>(HttpStatus.CONFLICT);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/books?id={id}").buildAndExpand(book.getBookId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
    @PutMapping("book")
    public ResponseEntity<Book> updateBook(@RequestBody Book book) {
        bookService.updateBook(book);
        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }
    @DeleteMapping("book")
    public ResponseEntity<Void> deleteBook(@RequestParam("id") String id) {
        bookService.deleteBook(Integer.parseInt(id));
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
/*
cd my-app
ng serve --open
 */