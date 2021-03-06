import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl="http://localhost:8080/api/v1/books";
  private categoryUrl="http://localhost:8080/api/v1/book-category";
  
  constructor(private httpClient:HttpClient) { 
    
  }
  // observable returns the data and observer consumes the data
  // book-list is consumer. observer needs to subscribe to the observable
  getBooks(theCategoryId:number):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
      return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(map(response=>response._embedded.books));
  }
  
  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBooksCategory>(this.categoryUrl).pipe(map(response=>response._embedded.bookCategory));

  }
}

interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
}

interface GetResponseBooksCategory{
  _embedded:{
    bookCategory:BookCategory[];
  }
}

