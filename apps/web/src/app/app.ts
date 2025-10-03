import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './features/auth/services/auth.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation" style="width: 100%;">
      <div class="navbar-brand">
        <a class="navbar-item" routerLink="/">
          <img ngSrc="/images/tech_radar_icon.png" alt="Tech Radar Logo" width="28" height="28">
        </a>
        <a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false" [class.is-active]="navOpen"
           (click)="navOpen = !navOpen">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" [class.is-active]="navOpen">
        <div class="navbar-start">
          <a class="navbar-item" routerLink="/">Radar</a>
          <a class="navbar-item" routerLink="/technologies">Management</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              @if (authenticated()) {
                <a class="button is-light" (click)="authService.clear()">Logout</a>
              } @else {
                <a class="button is-light" routerLink="/login">
                  Log in
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, RouterLink, NgOptimizedImage],
})
export class App {
  navOpen = false;

  authService = inject(AuthService);
  authenticated = signal<boolean>(false);

  constructor() {
    this.authService.isAuthenticatedObservable().subscribe((el) => this.authenticated.set(el));
  }
}
