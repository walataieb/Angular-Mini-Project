import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class SalleService {
  readonly reservationAPIUrl = environment.APIUrl;

  constructor(private http: HttpClient) {}

  //Get all salle
  getSalleList(): Observable<any[]> {
    return this.http.get<any>(this.reservationAPIUrl  + '/api/salles/list_salles');
  }

    //add salle
  addSalle(data: any) {
    return this.http.post(this.reservationAPIUrl  + '/api/salles/create', data);
  }

    //update salle
  updateSalle(id: any | string, data: any) {
    return this.http.put(this.reservationAPIUrl  + `/api/salles/update/${id}`, data);
  }

  //delete salle
  deleteInpection(id: any | string) {
    return this.http.delete(this.reservationAPIUrl  + `/api/salles/delete/${id}`);
  }


}

