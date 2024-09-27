import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.authService.isAuthenticated();
    if (user !== null) {
      return true; // Allow the route if the user is authenticated
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if the user is not authenticated
      return false; // Prevent route activation
    }
  }
}
