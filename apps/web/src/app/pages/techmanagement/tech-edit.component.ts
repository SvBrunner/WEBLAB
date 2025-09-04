import {Component, input} from '@angular/core';

@Component({
  selector: "app-tech-edit",
  template: `
    <h1>Edit Technology</h1>
    <p>{{ id() }}</p>

  `,
})
export class TechEditComponent {

  id = input.required<string>()

}
