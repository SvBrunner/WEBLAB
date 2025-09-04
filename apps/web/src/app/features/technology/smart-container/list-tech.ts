import {Component, inject, OnInit, signal} from '@angular/core';
import {TechService} from '../services/tech.service';
import {Technology} from './technology.type';
import {TechTable} from '../dumb-components/tech-table';

@Component({
  selector: 'list-tech',
  imports: [
    TechTable
  ],
  template: `
    <app-tech-table [technologies]="technologies()"/>
  `,

})
export class ListTech implements OnInit {
  techService = inject(TechService)
  technologies = signal<Technology[]>([]);

  fetchTechnologies() {
    this.techService.getTechnologies().subscribe((techs) => {
      this.technologies.set(techs)
      console.log(techs)
    })
  }

  ngOnInit() {
    this.fetchTechnologies()

  }

}
