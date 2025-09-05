import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Technology} from './technology.type';
import {TechForm} from '../dumb-components/tech-form';
import {TechService} from '../services/tech.service';

@Component({
  selector: 'app-edit-technology',
  standalone: true,
  template: `

    <app-tech-form (onFormSubmitted)="onFormSubmitted($event)" [technology]="tech()"/>
  `,
  imports: [TechForm],
})
export class EditTechnology implements OnInit {
  tech = signal<Partial<Technology>>({})

  id = input.required<string>();

  ngOnInit(): void {
    this.techService.getTechnology(this.id()).subscribe(el => this.tech.set(el));
  }

  private techService: TechService = inject(TechService)

  onFormSubmitted(tech: Technology) {
    console.log(tech);
    this.techService.addTechnology(tech);
  }
}


