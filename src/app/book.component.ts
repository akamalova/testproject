import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from './book.service';
import { Book } from './book';


@Component({
   selector: 'app-book',
   templateUrl: './book.component.html',
   styleUrls: ['./book.component.css']

})
export class BookComponent implements OnInit {

  //Component properties
  bookTitle: string ="";
  bookAuthor: string ="";
  allBooks: Book[];
  interimMass: Book[] = [];
  innerBooks: Book[] = [];
  statusCode: number;
  requestProcessing = false;
  bookIdToUpdate = null;
  processValidation = false;
  ifSearchOn = false;
  pagingNum: number = 0;
  pagingPage: number;
  buttonMass: number[] = [];
  findBookTitleField: string;
  findBookDiscriptionField: string;
  findBookAuthorField: string;
  findBookISBNField: string;
  findBookPrintYearField: string;
  findBookReedAlreadyField: string;
  findBookPrintYearTextField: string;
  ifPagingHidden = true;


  //Create form
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    printYear: new FormControl('', Validators.required),
   // readAlready: new FormControl('', Validators.required),
  });

   //Create constructor to get service instance
   constructor(private bookService: BookService) {

   }

   //Create ngOnInit() and load books
   ngOnInit(): void {
     this.ifSearchOn = false;
	   this.pagingNumUpdate(this.pagingNum);
	   this.getAllBooks();
   }

   reload(){
     document.location.reload(true);
   }
   //Fetch all books
   getAllBooks() {
     this.ifPagingHidden = true;
       this.bookService.getAllBooks()
         .subscribe(
           data => {
             this.allBooks = data;
             this.pagingPage = Math.ceil(this.allBooks.length / 10);
             for (let i = 0; i < this.pagingPage; i++) {
               this.buttonMass[i] = i * 10;
             }
           },
           errorCode => this.statusCode = errorCode);
   }

   selectParams(){
     this.ifSearchOn = true;
     this.statusCode = 0;
     this.pagingNum = 0;
     this.ifPagingHidden = false;
     let m = 0;
     this.findBookTitleField = (document.getElementById("findBookTitle") as HTMLTextAreaElement).value;
     this.findBookDiscriptionField = (document.getElementById("findBookDiscription") as HTMLTextAreaElement).value;
     this.findBookAuthorField = (document.getElementById("findBookAuthor") as HTMLTextAreaElement).value;
     this.findBookISBNField = (document.getElementById("findBookISBN") as HTMLTextAreaElement).value;
     this.findBookPrintYearField = (document.getElementById("findBookPrintYear") as HTMLTextAreaElement).value;
     this.findBookPrintYearTextField = (document.getElementById("findBookPrintYearText") as HTMLTextAreaElement).value;
     this.findBookReedAlreadyField = (document.getElementById("findBookReedAlready") as HTMLTextAreaElement).value;

     this.bookService.getAllBooks()
       .subscribe(
         data =>
         {
           this.allBooks = data;
           if (this.findBookTitleField != "") {
            for (let i = 0; i < this.allBooks.length; i++) {
               if (this.allBooks[i].title.toLowerCase().includes(this.findBookTitleField.toLowerCase())) {
                 this.interimMass[m] = this.allBooks[i];
                 m++;
               }
             }
             this.allBooks = this.interimMass;
             this.interimMass = [];
             m = 0;
           }
           if (this.findBookDiscriptionField != "") {
             for (let i = 0; i < this.allBooks.length; i++) {
               if (this.allBooks[i].description.toLowerCase().includes(this.findBookDiscriptionField.toLowerCase())) {
                 this.interimMass[m] = this.allBooks[i];
                 m++;
               }
             }
             this.allBooks = this.interimMass;
             this.interimMass = [];
             m = 0;
           }
           if (this.findBookAuthorField != "") {
            for (let i = 0; i < this.allBooks.length; i++) {

               if (this.allBooks[i].author.toLowerCase().includes(this.findBookAuthorField.toLowerCase())) {
                 this.interimMass[m] = this.allBooks[i];
                 m++;
               }
             }
             this.allBooks = this.interimMass;
             this.interimMass = [];
             m = 0;
           }
           if (this.findBookISBNField != "") {
            for (let i = 0; i < this.allBooks.length; i++) {
               if (this.allBooks[i].isbn.includes(this.findBookISBNField)) {
                 this.interimMass[m] = this.allBooks[i];
                 m++;
               }
             }
             this.allBooks = this.interimMass;
             this.interimMass = [];
             m = 0;
           }
           if (this.findBookPrintYearTextField != ""){
             if (parseInt(this.findBookPrintYearField) == 0) {
               for (let i = 0; i < this.allBooks.length; i++) {
                 if (this.allBooks[i].printYear == this.findBookPrintYearTextField) {
                   this.interimMass[m] = this.allBooks[i];
                   m++;
                 }
               }
             }
             if (parseInt(this.findBookPrintYearField) == 1) {
               for (let i = 0; i < this.allBooks.length; i++) {
                 if (this.allBooks[i].printYear > this.findBookPrintYearTextField) {
                   this.interimMass[m] = this.allBooks[i];
                   m++;
                 }
               }
             }
             if (parseInt(this.findBookPrintYearField) == 2) {
               for (let i = 0; i < this.allBooks.length; i++) {
                 if (this.allBooks[i].printYear < this.findBookPrintYearTextField) {
                   this.interimMass[m] = this.allBooks[i];
                   m++;
                 }
               }
             }
             this.allBooks = this.interimMass;
             this.interimMass = [];
             m = 0;
           }
           if (parseInt(this.findBookReedAlreadyField + "") != 2){
             for (let i = 0; i < this.allBooks.length; i++){
               if (this.allBooks[i].readAlready == this.findBookReedAlreadyField) {
                 this.interimMass[m] = this.allBooks[i];
                 m++;
               }
             }
             this.allBooks = this.interimMass;
             this.interimMass = [];
             m = 0;
           }
           this.innerBooks = this.allBooks;
         },
         errorCode =>  this.statusCode = errorCode);

   }

  pagingNumUpdate(n) {
    this.pagingNum = n;
    this.innerBooks = [];
    this.bookService.getAllBooks()
      .subscribe(
        data => {
          this.allBooks = data;
          for (let i = 0; i < 10; i++) {
            if (i + this.pagingNum >= this.allBooks.length) break;
            this.innerBooks[i] = this.allBooks[this.pagingNum + i];
          }
        },
        errorCode => this.statusCode = errorCode);
   }

   //Handle create and update book
   onBookFormSubmit() {
	  this.processValidation = true;
	  if (this.bookForm.invalid)
	       return; //Validation failed, exit from method.

	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	    let title = this.bookForm.get('title').value.trim();
      let description = this.bookForm.get('description').value.trim();
      let author = this.bookForm.get('author').value.trim();
      let isbn = this.bookForm.get('isbn').value;
      let printYear = this.bookForm.get('printYear').value;
      let readAlready = "0";

	  if (this.bookIdToUpdate === null) {
	    //Handle create book
	    let book= new Book(null, title, description, author, isbn, printYear, readAlready);
	    this.bookService.createBook(book)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
            this.pagingNumUpdate(this.buttonMass[this.buttonMass.length-1]);
            this.backToCreateBook();
            if(this.ifSearchOn) this.selectParams();
            else this.ngOnInit();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {
        //Handle update book
      let book = new Book(this.bookIdToUpdate, title, description, author, isbn, printYear, "0");
      this.bookService.updateBook(book)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.pagingNumUpdate(this.pagingNum);
            this.backToCreateBook();
            if(this.ifSearchOn) this.selectParams();
          },
          errorCode => this.statusCode = errorCode);
    }
   }
   //Load Book by id to edit
   loadBookToEdit(bookId: string) {
      this.preProcessConfigurations();
      this.bookService.getBookById(bookId)
	      .subscribe(book => {
                this.bookTitle = book.title;
                this.bookAuthor = book.author;
                this.bookIdToUpdate = book.bookId;
		            this.bookForm.setValue({ title: book.title, description: book.description, author: book.author, isbn: book.isbn, printYear: book.printYear, readAlready: book.readAlready});
					this.processValidation = true;
					this.requestProcessing = false;
		        },
		        errorCode =>  this.statusCode = errorCode);
    // this.bookIdToUpdate = 0;
   }
   //Delete book
  deleteBook(bookId: string) {
      this.preProcessConfigurations();
      this.bookService.deleteBookById(bookId)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
            this.pagingNumUpdate(this.pagingNum);
            this.backToCreateBook();
            if(this.ifSearchOn) this.selectParams();
            else this.reload();
			    },
		        errorCode => this.statusCode = errorCode);
   }
   // Reed book

  reedBook(bookId: string) {
     this.preProcessConfigurations();
    this.bookService.getBookById(bookId)
      .subscribe(book =>
        {
          book.readAlready = "1";

          this.bookService.updateBook(book)
            .subscribe(successCode => {
                this.statusCode = successCode;
                this.pagingNumUpdate(this.pagingNum);
                this.backToCreateBook();
              },
              errorCode => this.statusCode = errorCode);
        },
        errorCode =>  this.statusCode = errorCode);
  }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;
   }
   //Go back from update to create
   backToCreateBook() {
      this.bookIdToUpdate = null;
      this.bookForm.reset();
	  this.processValidation = false;
   }
}
