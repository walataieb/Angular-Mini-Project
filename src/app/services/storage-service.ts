import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private loggedin= new BehaviorSubject<boolean>(false);
  constructor() {}

  //clear localStorage after Logout
  logout(): void {
    localStorage.clear();
    this.loggedin.next(false);
  }

//Save key in localStorage in auth-user
  public saveUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

//
  public getUser(): any {
    const user =localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  get isLoggedIn () {
    const user =localStorage.getItem(USER_KEY);
    if (user) {
      this.loggedin.next(true);
    }
    return this.loggedin.asObservable();

  }
}
