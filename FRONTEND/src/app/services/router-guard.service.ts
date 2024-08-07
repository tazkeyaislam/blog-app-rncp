import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(
    public router: Router,
    public authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoleArray = route.data['expectedRole'];

    if (!this.authService.isAuthenticated()) {
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/']);
      return false;
    }

    const tokenPayload = this.authService.decodeToken();
    if (!tokenPayload) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    const userRole = tokenPayload.role;
    const isAuthorized = expectedRoleArray.includes(userRole);

    if (isAuthorized) {
      return true;
    }

    // Redirect and notify if unauthorized
    this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
    this.router.navigate(['/']);
    return false;
  }

}
