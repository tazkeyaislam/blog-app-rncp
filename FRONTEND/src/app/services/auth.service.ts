import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }

  public decodeToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // Retrieve the user role from the token
  public getUserRole(): string {
    const payload = this.decodeToken();
    return payload ? payload.role : '';
  }

  // Retrieve the user's email from the token
  public getUserEmail(): string {
    const payload = this.decodeToken();
    return payload ? payload.email : '';
  }
}
