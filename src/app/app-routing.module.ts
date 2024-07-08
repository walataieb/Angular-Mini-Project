import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  //Add the reservation management path
  {
    path: 'reservation',
    loadChildren: () => import('./reservations-management/reservations-management.module').then(m=> m.ReservationManagementModule),
    //canActivate: [authGuardGuard]
  },
  //Add the salle management path
  {
    path: '',
    loadChildren: () => import('./salles-management/salles-management.module').then(m=> m.SalleManagementModule),
    //canActivate: [authGuardGuard]
  },
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
