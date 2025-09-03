import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/">Home</a>
      |
      <a routerLink="/techradar">Techradar</a>
    </nav>
    <router-outlet/>
  `,
  imports: [RouterOutlet, RouterLink],
})
export class App {
}
