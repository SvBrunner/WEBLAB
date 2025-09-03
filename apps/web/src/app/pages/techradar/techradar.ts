import {Component} from '@angular/core';
import {CreateTechReactive} from '../../features/technology/smart-container/create-tech-reactive';

@Component({
  selector: 'app-user',
  template: `
    <h1>Create Tech Reactive</h1>
    <create-tech-reactive/>
  `,
  imports: [
    CreateTechReactive
  ],
})
export class Techradar {

}
