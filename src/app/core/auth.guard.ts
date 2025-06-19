import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);


  canActivate(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }

    alert('Please log in!');
    return false;
  }
}
