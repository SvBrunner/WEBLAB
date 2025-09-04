import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/">Radar</a>
      |
      <a routerLink="/technologies">Management</a>
    </nav>
    <router-outlet/>
  `,
  imports: [RouterOutlet, RouterLink],
})
export class App {
}
