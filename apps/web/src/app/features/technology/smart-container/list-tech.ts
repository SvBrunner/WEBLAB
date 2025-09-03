import {Component, inject} from '@angular/core';
import {TechService} from '../services/tech.service';
import {Technology} from './technology.type';

@Component({
  selector: 'list-tech',
  imports: [],
  template: `

  `,

})
export class ListTech {
  techService = inject(TechService)
  technologies: Technology[] = [];

  fetchTechnologies() {
    this.techService.getTechnologies().subscribe((techs) => this.technologies = techs)
  }
}
