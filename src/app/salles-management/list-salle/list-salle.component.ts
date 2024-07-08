import { Component, OnInit } from '@angular/core';
import { Salle } from '../../models/salle';
import { Router } from '@angular/router';
import { SalleService } from '../../services/salle-service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css']
})
export class ListSalleComponent implements OnInit {

  //declare salle list
  salleList: Salle[] = [];

  //declare new salle
  Salle: Salle = new Salle();

  isLoading:boolean = true;
  constructor(
    private bookService: SalleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner:NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSallesList();
    this.isLoading=false;
  }


  //get the list of salles
  getSallesList(){
    this.spinner.show();
    this.bookService.getSalleList().subscribe(data=>{
      this.salleList = data;
      this.spinner.hide();
      console.log("INSPECTION DATA=",this.salleList);
    },err=>{
      this.spinner.hide();
      this.messageService.add({severity:'error', summary: 'ERROR', detail: 'ERROR GETTING SALLE LIST', life: 3000});
      console.log("ERROR GETTING SALLE LIST");
    })
  }

//export salle to excel sheet
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.salleList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Livres");
    });
}

//navigate to reservation component
goToReservation() {
  this.router.navigate(['/reservation']);
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
