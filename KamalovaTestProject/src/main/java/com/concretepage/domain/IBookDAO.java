package com.concretepage.domain;

import com.concretepage.entity.Book;

import java.util.List;

public interface IBookDAO {
    List<Book> getAllBooks();
    Book getBookById(int bookId);
    void createBook(Book book);
    void updateBook(Book Book);
    void deleteBook(int bookId);

    boolean bookExists(String title, String author, String isbn, int printYear);
}
