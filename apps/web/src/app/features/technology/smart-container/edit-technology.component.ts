import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Technology} from '../technology.type';
import {TechForm} from '../dumb-components/tech-form';
import {TechService} from '../services/tech.service';
import {BackService} from '../../../pages/back.service';

@Component({
  selector: 'app-edit-technology',
  standalone: true,
  template: `
    <app-tech-form class="box" (onFormSubmitted)="onFormSubmitted($event)" [technology]="tech()" [error]="error()"/>
  `,
  imports: [TechForm],
})
export class EditTechnology implements OnInit {
  tech = signal<Partial<Technology>>({})
  id = input.required<string>();
  error = signal<string | null>(null)

  ngOnInit(): void {
    this.techService.getTechnology(this.id()).subscribe(el => this.tech.set(el));
  }

  private techService: TechService = inject(TechService)
  private back: BackService = inject(BackService);

  onFormSubmitted(tech: Technology) {
    tech.id = this.id();
    this.techService.updateTechnology(tech).subscribe(() => {
      this.back.backFallbackTo();
    });
  }
}


