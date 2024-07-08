
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  readonly bookAPIUrl = environment.APIUrl;

  constructor(private http: HttpClient) {}

  //Books
  getBookList(): Observable<any[]> {
    return this.http.get<any>(this.bookAPIUrl + '/allbooks');
  }

  addBook(data: any) {
    return this.http.post(this.bookAPIUrl + '/', data);
  }

  updateBook(id: number | string, data: any) {
    return this.http.put(this.bookAPIUrl + `/update/${id}`, data);
  }

  deleteInpection(id: number | string) {
    return this.http.delete(this.bookAPIUrl + `/delete/${id}`);
  }


}


