import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DisplayBooksComponent} from './display-books/display-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LoginComponent } from './auth/login/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayBooksComponent
  },
  {
    path: 'book',
    component: AddBookComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
