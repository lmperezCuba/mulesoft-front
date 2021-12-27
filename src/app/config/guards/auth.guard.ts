import { SecurityService } from './../services/security.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this will be passed from the route config on the data property
    const expectedRoles: string[] = route.data['expectedRoles'];
    const decodeClaims = this.securityService.fakeDEcodeJWT(localStorage.getItem('jwt'));
    if (!this.securityService.isLoggedIn() || !(decodeClaims['claims'] as string[])
      .some((value) => { return expectedRoles.includes(value) })) {
      return this.router.parseUrl('/login');
    } else {
      return true;
    }
  }

}
