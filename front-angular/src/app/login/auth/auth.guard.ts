import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRole']; 
    const userRole = this.authService.getUserRole(); 

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false; 
    }

    if (Array.isArray(expectedRoles)) {
      if (!expectedRoles.includes(userRole)) {
        this.router.navigate(['']); 
        return false;
      }
    } else {
      if (userRole !== expectedRoles) {
        this.router.navigate(['']); // Redirige si no coincide
        return false;
      }
    }
    return true; 
  }
}
