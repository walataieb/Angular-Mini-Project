import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { ReservationService } from '../../services/reservation-service';
import { Reservation } from '../../models/reservation';
import { SalleService } from '../../services/salle-service';
import { Salle } from '../../models/salle';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  salle?: Salle;
  dateDebut?: Date;
  datefin?: Date;
  public reservation?: Reservation;
  public updreservation?: Reservation;
  form_data?: FormData;

  constructor(private ref: DynamicDialogRef,
  private reservationService: ReservationService,
  private config?: DynamicDialogConfig
) {
    if (this.config?.data) {
      this. updreservation= this.config.data.reservation;
      this.reservation = this.config.data.reservation;
      this.dateDebut = this. updreservation?.dateDebut;
      this.datefin = this.updreservation?.dateFin;
    }

   }

   ngOnInit(): void {
  }

  //ADD OR UPDATE THE RESERVATION RECORD
  save() {
    if (!this.updreservation) {
      this.reservation = new Reservation();
      this.reservation.salle = this.salle;
      this.reservation.dateDebut = this.dateDebut;
      this.reservation.dateFin = this.datefin;
      this.reservationService
        .addReservation(this.reservation)
        .pipe(take(1))
        .subscribe((data) => {
          console.log(data);
          this.ref.close(this.reservation);
        });
    } else {
      this.updreservation.salle = this.salle;
      this.updreservation.dateDebut = this.dateDebut;
      this.updreservation.dateFin = this.datefin;
      this.reservationService
        .updateReservation(this.updreservation.salle, this.updreservation)
        .pipe(take(1))
        .subscribe((data:any) => {
          console.log(this.updreservation);
          this.ref.close(data.data);
        });
    }
  }

}
