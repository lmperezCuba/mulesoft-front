import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private router: Router) { }

  logout() {
    // not implemente yet
    this.router.navigate(['login']);
  }
}
