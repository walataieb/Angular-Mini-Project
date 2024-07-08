
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class ReservationService {


  readonly reservationAPIUrl = environment.APIUrl;

  constructor(private http: HttpClient) {}

  //Get all reservation
  getReservationList(): Observable<any[]> {
    return this.http.get<any>(this.reservationAPIUrl  + '/api/reservation/list_reservations');
  }

    //add reservation
  addReservation(data: any) {
    return this.http.post(this.reservationAPIUrl  + '/api/reservation/create_reservation', data);
  }

    //update reservation
  updateReservation(id: number | string, data: any) {
    return this.http.put(this.reservationAPIUrl  + `/api/reservation/update_reservation/${id}`, data);
  }

  //delete reservation
  deleteInpection(id: number | string) {
    return this.http.delete(this.reservationAPIUrl  + `/api/reservation/annuler_reservation/${id}`);
  }


}



