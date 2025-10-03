import {Component} from '@angular/core';
import {ListTech} from '../../features/technology/smart-container/list-tech';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tech-overview',
  template: `
    <section class="section">

      <h1 class="title">Management</h1>

      <div class="has-text-right">
        <a class="button is-primary mr-2" routerLink="/technologies/draft">Create Draft</a>
        <a class="button is-primary" routerLink="/technologies/add">Create</a>
      </div>
      <list-tech/>
    </section>
  `,
  imports: [
    ListTech,
    RouterLink
  ],
})
export class TechOverview {

}
