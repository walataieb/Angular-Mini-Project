import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation-service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {

  //declare reservation list
  reservationList: Reservation[] = [];


  //Reservation selected variable
  selectedReservation: Reservation | null = null;

  ref?: DynamicDialogRef;


  //declare new reservation
  Reservation: Reservation = new Reservation();

  isLoading:boolean = true;
  constructor(
    private reservationService: ReservationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner:NgxSpinnerService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getReservationsList();
    this.isLoading=false;
  }


  //get the list of reservations
  getReservationsList(){
    this.spinner.show();
    this.reservationService.getReservationList().subscribe(data=>{
      this.reservationList = data;
      this.spinner.hide();
      console.log("INSPECTION DATA=",this.reservationList);
    },err=>{
      this.spinner.hide();
      this.messageService.add({severity:'error', summary: 'ERROR', detail: 'ERROR GETTING RESERVATION LIST', life: 3000});
      console.log("ERROR GETTING RESERVATION LIST");
    })
  }

//export reservation to excel sheet
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.reservationList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Reservations");
    });
}

//navigate to reservation component
goToReservation() {
  this.router.navigate(['/']);
}

//Get the selected reservation
selectReservation(reservation: Reservation) {

  this.selectedReservation = reservation;
}

//Update Reservation
public updateReservation(reservation: Reservation){
 this.selectedReservation = reservation;
 console.log("update  : ",this.selectedReservation);
 this.ref = this.dialogService.open(AddReservationComponent, { header: 'Modification réservation',
 baseZIndex: 10000,
 width:"80%",
 data: {
   reservation: this.selectedReservation // Pass the selected reservation as data
}});
 this.ref.onClose.subscribe((reservation:any) => {
   if (reservation) {
   // Find the index of the selected reservation in the ReservationList
   const userIndex = this.reservationList.findIndex(u => u.salle === reservation.salle);

   if (userIndex !== -1) {
     // Replace the reservation with the updated reservation
     this.reservationList[userIndex] = reservation;
     console.log("RESERVATION updated SUCCESSFULLY:", reservation);
   }
 }
});
}

fetchReservationList() {
 // Fetch the updated reservation list from the server and update ReservationList
 this.reservationService.getReservationList().subscribe((reservations) => {
   this.reservationList = reservations;
 });
}


//DELETE SALLE
onDeleteReservation(reservation: Reservation) {
 this.selectedReservation = reservation;
 if (this.selectedReservation) {
   // Show a confirmation dialog
   this.confirmationService.confirm({
     message: 'Voulez-vous supprimer cette reservation ?',
     header: 'Confirmation',
     icon: 'pi pi-exclamation-triangle',
     acceptLabel: 'Oui', // Customize the accept (Yes) button label
     rejectLabel: 'Non', // Customize the reject (No) button label
     accept: () => {
       // User clicked "Yes"

       const userIndex = this.reservationList.findIndex(u => u.salle === this.selectedReservation?.salle);
       this.reservationService.updateReservation( this.selectedReservation?.salle, this.selectedReservation).subscribe(() => {
         this.fetchReservationList();
         this.selectedReservation = null;
       });

       if (userIndex !== -1) {
         this.reservationList.splice(userIndex, 1);
       }
     },
     reject: () => {
       // User clicked "No" or closed the dialog
     },
   });
 }
}

//save result to excel file
saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
