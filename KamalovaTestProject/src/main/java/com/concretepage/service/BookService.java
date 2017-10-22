package com.concretepage.service;

import com.concretepage.domain.IBookDAO;
import com.concretepage.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookService implements IBookService {

    @Autowired
    private IBookDAO IBookDAO;

    @Override
    public List<Book> getAllBooks() {
        return IBookDAO.getAllBooks();
    }

    @Override
    public Book getBookById(int bookId) {
        return IBookDAO.getBookById(bookId);
    }

    @Override
    public boolean createBook(Book book) {
        if (IBookDAO.bookExists(book.getTitle(), book.getAuthor(), book.getIsbn(), book.getPrintYear())) {
            return false;
        } else {
            IBookDAO.createBook(book);
            return true;
        }
    }

    @Override
    public void updateBook(Book book) {
        IBookDAO.updateBook(book);

    }

    @Override
    public void deleteBook(int bookId) {
        IBookDAO.deleteBook(bookId);
    }

}
