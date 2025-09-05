import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" routerLink="/">
          <strong>Radar</strong>
        </a>

        <!-- Burger für Mobile -->
        <a role="button" class="navbar-burger"
           [class.is-active]="navOpen"
           aria-label="menu" aria-expanded="false"
           (click)="navOpen = !navOpen">
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
      </div>
    </nav>

    <router-outlet></router-outlet>

  `,
  imports: [RouterOutlet, RouterLink],
})
export class App {
  navOpen = false;
}
