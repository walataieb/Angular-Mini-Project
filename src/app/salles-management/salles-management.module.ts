import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalleManagementRoutingModule } from './salles-management-routing.module';
//import { AddUserComponent } from './add-user/add-user.component';
import {  ListSalleComponent } from './list-salle/list-salle.component';
import {  AddSalleComponent } from './add-salle/add-salle.component';
import { PrimeNgSharedModule } from 'src/app/prime-ng-shared/prime-ng-shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


//Declare the modules of the Salles management

@NgModule({
  declarations: [

    ListSalleComponent,
    AddSalleComponent
  ],
  imports: [
    CommonModule,
    PrimeNgSharedModule,
    NgxSpinnerModule,
    SalleManagementRoutingModule
  ]
})
export class SalleManagementModule { }
