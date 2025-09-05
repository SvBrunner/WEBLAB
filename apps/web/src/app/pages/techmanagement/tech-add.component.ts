import {Component} from '@angular/core';
import {CreateNewTechnology} from '../../features/technology/smart-container/create-new-technology';

@Component({
  selector: "app-tech-add",
  template: `
    <h1>Add Technology</h1>
    <create-new-technology/>
  `,
  imports: [
    CreateNewTechnology
  ]
})
export class TechAddComponent {


}
