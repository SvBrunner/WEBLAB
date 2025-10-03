import {Component} from '@angular/core';
import {TechRadarComponent} from '../../features/technology/smart-container/tech-radar.component';

@Component({
  selector: 'app-radar',
  template: `
    <app-tech-radar/>
  `,
  imports: [
    TechRadarComponent
  ],
})
export class Techradar {

}
