import {Component, inject} from '@angular/core';
import {Technology} from './technology.type';
import {TechForm} from '../dumb-components/tech-form';
import {TechService} from '../services/tech.service';

@Component({
  selector: 'create-new-technology',
  standalone: true,
  template: `
    
    <app-tech-form (onFormSubmitted)="onFormSubmitted($event)"/>
  `,
  imports: [TechForm],
})
export class CreateNewTechnology {
  private techService: TechService = inject(TechService)

  onFormSubmitted(tech: Technology) {
    console.log(tech);
    this.techService.addTechnology(tech);
  }
}


