import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Book } from './book';

@Injectable()
export class BookService {
    //URLs for CRUD operations
    allBooksUrl = "http://localhost:8080/user/all-books";
	  bookUrl = "http://localhost:8080/user/book";
	//Create constructor to get Http instance
	constructor(private http:Http) {
	}
	//Fetch all books
    getAllBooks(): Observable<Book[]> {
        return this.http.get(this.allBooksUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create Book
    createBook(book: Book):Observable<number> {
	      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.bookUrl, book, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch Book by id
    getBookById(bookId: string): Observable<Book> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', bookId);
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.bookUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }
	//Update Book
    updateBook(book: Book):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.bookUrl, book, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete Book
    deleteBookById(bookId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', bookId);
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.bookUrl, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }

	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}
