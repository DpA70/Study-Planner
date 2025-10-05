// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInfo } from '../utils/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userInfo = new BehaviorSubject<UserInfo | null>(null);

  constructor(private http: HttpClient) {}

  loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/oauth2/authorization/google`;
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/rest/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Logout successful:', response);
          this.setLoggedIn(false);
          this.userInfo.next(null);
          window.location.href = 'http://localhost:4200';
        },
        error: (error) => {
          console.error('Logout error:', error);
          // Fallback: clear local state anyway
          this.setLoggedIn(false);
          this.userInfo.next(null);
        }
      });
  }

  checkAuthentication(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/rest/auth/user`, { 
      withCredentials: true 
    }).pipe(
      tap(userInfo => {
        this.setLoggedIn(userInfo.authenticated);
        this.userInfo.next(userInfo);
        // Store in localStorage for quick access
        if (userInfo.authenticated) {
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          localStorage.removeItem('isLoggedIn');
        }
      })
    );
  }

  getAccessToken(): Observable<{accessToken: string}> {
    return this.http.get<{accessToken: string}>(`${this.apiUrl}/rest/auth/token`, {
      withCredentials: true
    });
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserInfo(): Observable<UserInfo | null> {
    return this.userInfo.asObservable();
  }

  // Helper method to check if user is logged in (synchronous)
  isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}