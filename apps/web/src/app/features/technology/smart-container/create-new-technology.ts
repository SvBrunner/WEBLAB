import {Component, inject, signal} from '@angular/core';
import {Technology} from '../technology.type';
import {TechForm} from '../dumb-components/tech-form';
import {TechService} from '../services/tech.service';
import {BackService} from '../../../pages/back.service';
import {CreateTechnologyDto} from '../create-technology.dto';

@Component({
  selector: 'create-new-technology',
  standalone: true,
  template: `
    <app-tech-form class="box" [error]="error()" (onFormSubmitted)="onFormSubmitted($event)"/>
  `,
  imports: [TechForm],
})
export class CreateNewTechnology {
  private techService: TechService = inject(TechService)
  private back: BackService = inject(BackService);
  error = signal<string | null>(null)

  onFormSubmitted(tech: CreateTechnologyDto) {

    if (tech.ring == null) {
      this.error.set("Ring is required");
      return;
    }
    if (tech.category == null) {
      this.error.set("Category is required");
      return;
    }
    if (tech.description == null || tech.description.trim() === "") {
      this.error.set("Description is required");
      return;
    }
    console.log(tech);
    console.log("Form submitted")
    this.techService.addTechnology(tech).subscribe(() => {
      this.back.backFallbackTo();
    });
  }
}


