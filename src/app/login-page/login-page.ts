// login-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage implements OnInit, OnDestroy {
  currentTheme = 'light-theme';
  isLoading: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    
    // Subscribe to login status changes
    this.authSubscription.add(
      this.authService.isLoggedIn().subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/calendar']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private checkAuthStatus(): void {
    this.isLoading = true;
    this.authService.checkAuthentication().subscribe({
      next: (userInfo) => {
        this.isLoading = false;
        if (userInfo.authenticated) {
          console.log('User is authenticated:', userInfo);
          this.router.navigate(['/home']);
        } else {
          console.log('User is not authenticated');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error checking authentication:', error);
      }
    });
  }

  signInWithGoogle(): void {
    this.isLoading = true;
    this.authService.loginWithGoogle();
    
    // Set timeout to handle cases where redirect doesn't happen
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  onSignIn(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert('Please use Google Sign In for authentication');
    }, 1000);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', this.currentTheme);
  }
}