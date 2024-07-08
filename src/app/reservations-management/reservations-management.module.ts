import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationManagementRoutingModule } from './reservations-management-routing.module';
//import { AddUserComponent } from './add-user/add-user.component';
import {  ListReservationComponent } from './list-reservation/list-reservation.component';
import {  AddReservationComponent } from './add-reservation/add-reservation.component';
import { PrimeNgSharedModule } from 'src/app/prime-ng-shared/prime-ng-shared.module';


//Declare the modules of the reservations management

@NgModule({
  declarations: [

    ListReservationComponent,
    AddReservationComponent
  ],
  imports: [
    CommonModule,
    PrimeNgSharedModule,
    ReservationManagementRoutingModule
  ]
})
export class ReservationManagementModule { }
