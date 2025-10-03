import {Component, input} from '@angular/core';
import {DetailTechComponent} from '../../features/technology/smart-container/detail-tech.component';

@Component({
  selector: "app-tech-edit",
  template: `
    <div class="container">
      <app-tech-detail [id]="id()"></app-tech-detail>
    </div>
  `,
  imports: [
    DetailTechComponent
  ]
})
export class TechDetailComponent {
  id = input.required<string>()
}
