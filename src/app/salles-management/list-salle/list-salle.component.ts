import { Component, OnInit } from '@angular/core';
import { Salle } from '../../models/salle';
import { Router } from '@angular/router';
import { SalleService } from '../../services/salle-service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddSalleComponent } from '../add-salle/add-salle.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css']
})
export class ListSalleComponent implements OnInit {

  //declare salle list
  salleList: Salle[] = [];

  //Salle selected variable
  selectedSalle: Salle | null = null;

  ref?: DynamicDialogRef;

  //declare new salle
  Salle: Salle = new Salle();

  isLoading:boolean = true;
  constructor(
    private salleService: SalleService,
    private messageService: MessageService,
    private spinner:NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getSallesList();
    this.isLoading=false;
  }


  //get the list of salles
  getSallesList(){
    this.spinner.show();
    this.salleService.getSalleList().subscribe(data=>{
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
        this.saveAsExcelFile(excelBuffer, "Salles");
    });
}


//open Modal to add reservation

public addNewSalle(){
  this.ref = this.dialogService.open(AddSalleComponent, { header: 'Ajouter nouveau chauffeur',
  baseZIndex: 10000,
  width:"80%"});
  this.ref.onClose.subscribe((salle:any) => {
    if (salle) {
      this.salleList.push(salle);
      console.log("SALLE ADDED SUCCESFULLY:",salle);
    }
});
}

//Get the selected salle
selectSalle(salle: Salle) {

   this.selectedSalle = salle;
 }

//Update Salle
public updateSalle(salle: Salle){
  this.selectedSalle = salle;
  console.log("update  : ",this.selectedSalle);
  this.ref = this.dialogService.open(AddSalleComponent, { header: 'Modification salle',
  baseZIndex: 10000,
  width:"80%",
  data: {
    salle: this.selectedSalle // Pass the selected salle as data
}});
  this.ref.onClose.subscribe((salle:any) => {
    if (salle) {
    // Find the index of the selected salle in the SalleList
    const userIndex = this.salleList.findIndex(u => u.nameSalle === salle.nameSalle);

    if (userIndex !== -1) {
      // Replace the salle with the updated salle
      this.salleList[userIndex] = salle;
      console.log("USER updated SUCCESSFULLY:", salle);
    }
  }
});
}

fetchSalleList() {
  // Fetch the updated salle list from the server and update SalleList
  this.salleService.getSalleList().subscribe((salles) => {
    this.salleList = salles;
  });
}


//DELETE SALLE
onDeleteSalle(driver: Salle) {
  this.selectedSalle = driver;
  if (this.selectedSalle) {
    // Show a confirmation dialog
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette salle ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui', // Customize the accept (Yes) button label
      rejectLabel: 'Non', // Customize the reject (No) button label
      accept: () => {
        // User clicked "Yes"

        const userIndex = this.salleList.findIndex(u => u.nameSalle === this.selectedSalle?.nameSalle);
        this.salleService.updateSalle( this.selectedSalle?.nameSalle, this.selectedSalle).subscribe(() => {
          this.fetchSalleList();
          this.selectedSalle = null;
        });

        if (userIndex !== -1) {
          this.salleList.splice(userIndex, 1);
        }
      },
      reject: () => {
        // User clicked "No" or closed the dialog
      },
    });
  }
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
