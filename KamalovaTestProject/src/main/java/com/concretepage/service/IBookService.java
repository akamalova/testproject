package com.concretepage.service;

import com.concretepage.entity.Book;

import java.util.List;

public interface IBookService {
    List<Book> getAllBooks();
    Book getBookById(int bookId);
    boolean createBook(Book book);
    void updateBook(Book book);
    void deleteBook(int bookId);
}
