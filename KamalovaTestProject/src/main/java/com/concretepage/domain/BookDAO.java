package com.concretepage.domain;

import com.concretepage.entity.Book;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
@Repository
public class BookDAO implements IBookDAO {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Book getBookById(int bookId) {
        return entityManager.find(Book.class, bookId);
    }
    @SuppressWarnings("unchecked")
    @Override
    public List<Book> getAllBooks() {
        String hql = "FROM Book as atcl ORDER BY atcl.id";
        return (List<Book>) entityManager.createQuery(hql).getResultList();
    }
    @Override
    public void createBook(Book book) {
        entityManager.persist(book);
    }
    @Override
    public void updateBook(Book book) {
        Book newBook = getBookById(book.getBookId());
        newBook.setTitle(book.getTitle());
        newBook.setDescription(book.getDescription());
        newBook.setAuthor(book.getAuthor());
        newBook.setIsbn(book.getIsbn());
        newBook.setPrintYear(book.getPrintYear());
        newBook.setReadAlready(book.getReadAlready());
        entityManager.flush();
    }
    @Override
    public void deleteBook(int bookId) {
        entityManager.remove(getBookById(bookId));
    }

    @Override
    public boolean bookExists(String title, String author, String isbn, int printYear) {
        String hql = "FROM Book as atcl WHERE atcl.title = ? and atcl.author = ? and atcl.isbn = ? and atcl.printYear = ?";
        int count = entityManager.createQuery(hql).setParameter(1, title)
                .setParameter(2, author)
                .setParameter(3, isbn)
                .setParameter(4, printYear).getResultList().size();
        return count > 0;
    }

}
