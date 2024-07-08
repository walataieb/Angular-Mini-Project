import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation-service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {

  //declare reservation list
  reservationList: Reservation[] = [];

  //declare new reservation
  Reservation: Reservation = new Reservation();

  isLoading:boolean = true;
  constructor(
    private reservationService: ReservationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner:NgxSpinnerService,
    private router: Router
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

//navigate to salle component
goToSalle() {
  this.router.navigate(['/']);
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
