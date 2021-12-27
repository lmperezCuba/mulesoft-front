import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SecurityService {

  constructor(private router: Router, private permissionsService: NgxPermissionsService) { }

  /**
   * Check if the user is logged in the system
   */
  isLoggedIn() {
    // const permissions: string[] = this.permissionsService.getPermissions()['permissions']
    return Object.keys(this.permissionsService.getPermissions()).length;
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    const userInfo = JSON.parse(jwt as string)['userInfo'];
    return userInfo;
  }

  logout() {
    // not implemente yet
    //   this.isLogged = false;
    this.router.navigate(['login']);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    throw Error("Something bad happened; please try again later.");
  }

  /**
   * Extract the user data and claims
   * @param fakeJWT 
   */
  fakeDEcodeJWT(fakeJWT: string | null = '') {
    if (fakeJWT === null) return {};
    return JSON.parse(fakeJWT);
  }
}
