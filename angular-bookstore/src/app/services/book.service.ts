import { Injectable} from '@angular/core';
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
  getBooks(theCategoryId:number, currentPage:number,pageSize:number):Observable<GetResponseBooks>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }
  
  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBooksCategory>(this.categoryUrl).pipe(map(response=>response._embedded.bookCategory));

  }
  searchBooks(keyword:string,currentPage:number,pageSize:number):Observable<GetResponseBooks>{
    const searchUrl=`${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }
  getSpecBDet(bookId:number):Observable<Book>{
    const bookDetailsUrl= `${this.baseUrl}/${bookId}`;
  return this.httpClient.get<Book>(bookDetailsUrl);
  }
}

interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }

  //this complete object comes from spring boot backend rest api
  //check localhost:8080/api/v1/books
  page:{
    //num of records in each page.
    size:number;
    //total number of records in database.
    totalElements:number;
   // total number of pages stats from 0
    totalPages:number;
    //current page
    number:number;
  }
}

interface GetResponseBooksCategory{
  _embedded:{
    bookCategory:BookCategory[];
  }
}

