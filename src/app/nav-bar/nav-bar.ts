// nav-bar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../utils/UserInfo';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    RouterModule
  ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBar implements OnInit, OnDestroy {

  tabs: any[] = [];
  isDarkTheme = false;
  isLoggedIn: boolean = false;
  userInfo: UserInfo | null = null;
  
  private authSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tabs = [
      { label: 'Home', route: '/home', icon: 'home' },
      { label: 'Events', route: '/events', icon: 'event' }
    ];

    // Check initial authentication status
    this.checkAuthStatus();

    // Subscribe to authentication changes
    this.authSubscription.add(
      this.authService.isLoggedIn().subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (!isLoggedIn) {
          this.userInfo = null;
        }
      })
    );

    // Subscribe to user info changes
    this.authSubscription.add(
      this.authService.getUserInfo().subscribe(userInfo => {
        this.userInfo = userInfo;
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private checkAuthStatus(): void {
    this.authService.checkAuthentication().subscribe({
      next: (userInfo) => {
        this.isLoggedIn = userInfo.authenticated;
        this.userInfo = userInfo;
      },
      error: (error) => {
        console.error('Error checking auth status:', error);
        this.isLoggedIn = false;
        this.userInfo = null;
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    
    // Save theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  redirectToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    this.authService.logout();
  }

  // Load theme preference on init
  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }
}