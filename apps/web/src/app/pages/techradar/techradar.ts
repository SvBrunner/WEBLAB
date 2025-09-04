import {Component, forwardRef} from '@angular/core';
import {CreateNewTechnology} from '../../features/technology/smart-container/create-new-technology';
import {ListTech} from '../../features/technology/smart-container/list-tech';

@Component({
  selector: 'app-user',
  template: `
    <h1>Techradar</h1>
    <list-tech/>
  `,
  imports: [
    ListTech
  ],
})
export class Techradar {

}
