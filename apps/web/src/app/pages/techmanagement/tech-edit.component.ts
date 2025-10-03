import {Component, input} from '@angular/core';
import {EditTechnology} from '../../features/technology/smart-container/edit-technology.component';

@Component({
  selector: "app-tech-edit",
  template: `
    <app-edit-technology [id]="id()"/>
  `,
  imports: [
    EditTechnology,
  ]
})
export class TechEditComponent {
  id = input.required<string>()
}
