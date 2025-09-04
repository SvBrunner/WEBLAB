import {Component} from '@angular/core';
import {CreateNewTechnology} from '../../features/technology/smart-container/create-new-technology';

@Component({
  selector: 'app-tech-overview',
  template: `
    <h1>Management</h1>
    <create-new-technology/>

  `,
  imports: [
    CreateNewTechnology
  ],
})
export class TechOverview {

}
