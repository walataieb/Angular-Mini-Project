import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from './services/storage-service';
import { AuthService } from './services/auth-service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  //set the variables i need for verification if user logged in or not
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  private destroyed$ = new Subject<boolean>();
  private previousLoginStatus = false;

  constructor(private storageService: StorageService, private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
    // if the user logged in get the current user connected from the local storage
    this.storageService.isLoggedIn.pipe(takeUntil(this.destroyed$)).subscribe(data=>{
      console.log("IS LOGGED IN APPICOMPONANT= ",data)
      this.isLoggedIn=data;
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();




        this.username = user.username;
      } else {
        this.router.navigate(['/login']);
      }
    })


  }

  //cleaned up any subscribtion after the component is being destroyed.
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  //logout method
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.logout();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
