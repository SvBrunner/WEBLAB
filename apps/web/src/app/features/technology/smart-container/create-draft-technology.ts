import {Component, inject, signal} from '@angular/core';
import {Technology} from '../technology.type';
import {TechForm} from '../dumb-components/tech-form';
import {TechService} from '../services/tech.service';
import {BackService} from '../../../pages/back.service';
import {CreateTechnologyDto} from '../create-technology.dto';
import {CreateDraftTechnologyDto} from '../create-draft-technology.dto';

@Component({
  selector: 'create-draft-technology',
  standalone: true,
  template: `
    <app-tech-form class="box" [error]="error()" (onFormSubmitted)="onFormSubmitted($event)"/>
  `,
  imports: [TechForm],
})
export class CreateDraftTechnology {
  private techService: TechService = inject(TechService)
  private back: BackService = inject(BackService);
  error = signal<string | null>(null)

  onFormSubmitted(tech: CreateDraftTechnologyDto) {
    if (tech.category == null) {
      this.error.set("Category is required");
      return;
    }
    this.techService.createDraftTechnology(tech).subscribe(() => {
      this.back.backFallbackTo();
    });
  }
}


