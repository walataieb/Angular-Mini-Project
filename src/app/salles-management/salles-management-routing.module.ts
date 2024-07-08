import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  ListSalleComponent } from './list-salle/list-salle.component';
import {  AddSalleComponent } from './add-salle/add-salle.component';

//import { AddUserComponent } from './add-user/add-user.component';

//Adding the routing of Salle management : List & add components
const routes: Routes = [
  {
    path:'',
    component: ListSalleComponent
  },
  {
    path:'add',
    component: AddSalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalleManagementRoutingModule { }
