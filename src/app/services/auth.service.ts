import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiBaseUrl}/AdminPanelCtrl/admin-login`; // environment use

  constructor(private http: HttpClient, private router: Router) {}

  // Login API call
  login(model: any) {
    return this.http.post<any>(this.baseUrl, model);
  }

  // Save JWT token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
