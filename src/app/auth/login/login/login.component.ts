import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { StorageService } from '../../../services/storage-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private authService: AuthService, private storageService: StorageService ,private router:Router) { }

  ngOnInit(): void {
    this.storageService.isLoggedIn.subscribe(data=>{
      this.isLoggedIn=data;
      if(this.isLoggedIn === true){
        this.router.navigateByUrl('/');
      }
      this.roles = this.storageService.getUser().roles;
    });
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.router.navigate(['/']);

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  login(username:any, password:any){
    this.authService.login(username, password).toPromise();
  }

  reloadPage(): void {
    window.location.reload();

  }
}

