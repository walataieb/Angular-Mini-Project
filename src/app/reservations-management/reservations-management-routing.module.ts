import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  ListReservationComponent } from './list-reservation/list-reservation.component';
import {  AddReservationComponent } from './add-reservation/add-reservation.component';

//import { AddUserComponent } from './add-user/add-user.component';

//Adding the routing of reservation management : List & add components
const routes: Routes = [
  {
    path:'',
    component: ListReservationComponent
  },
  {
    path:'add',
    component: AddReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationManagementRoutingModule { }
