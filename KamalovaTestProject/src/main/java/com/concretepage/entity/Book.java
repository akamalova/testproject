package com.concretepage.entity;

import java.io.Serializable;


import javax.persistence.*;

@Entity
    @Table(name="book")

    public class Book implements Serializable {

        @Id
        @GeneratedValue(strategy=GenerationType.AUTO)
       // @PrimaryKeyJoinColumn
        @Column(name = "id")
        private int bookId;
        @Column(name = "title", length = 100)
        private String title;
        @Column(name = "description", length = 255)
        private String description;
        @Column(name = "author", length = 100)
        private String author;
        @Column(name = "isbn", length = 20)
        private String isbn;
        @Column(name = "printYear")
        private int printYear;
        @Column(name = "readAlready")
        private byte readAlready;

        private static final long serialVersionUID = 1L;

        public int getBookId() {
            return bookId;
        }
        public void setBookId(int bookId) { this.bookId = bookId; }

        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }
        public void setDescription(String description) {
            this.description = description;
        }

        public String getAuthor() {
            return author;
        }
        public void setAuthor(String author) {
            this.author = author;
        }

        public String getIsbn() {
            return isbn;
        }
        public void setIsbn(String isbn) {
            this.isbn = isbn;
        }

        public int getPrintYear() {
            return printYear;
        }
        public void setPrintYear(int printYear) {
            this.printYear = printYear;
        }

        public byte getReadAlready() {
            return readAlready;
        }

        public void setReadAlready(byte readAlready) {
            this.readAlready = readAlready;

        }
    }
