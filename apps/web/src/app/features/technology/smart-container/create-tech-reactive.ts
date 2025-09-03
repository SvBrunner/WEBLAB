import {Component, inject} from '@angular/core';
import {Ring, Technology} from './technology.type';
import {CreateTechFormReactive} from '../dumb-components/create-tech-form-reactive';
import {TechService} from '../services/tech.service';

@Component({
  selector: 'create-tech-reactive',
  standalone: true,
  template: `
    <app-create-tech-form-reactive (onFormSubmitted)="onFormSubmitted($event)"/>
  `,
  imports: [CreateTechFormReactive],
})
export class CreateTechReactive {

  private techService: TechService = inject(TechService)
  protected readonly Ring = Ring;
  protected readonly Object = Object;

  onFormSubmitted(tech: Technology) {
    console.log(tech);
    this.techService.addTechnology(tech);
  }
}


