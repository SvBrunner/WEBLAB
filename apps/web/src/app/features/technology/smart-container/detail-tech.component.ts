import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Technology} from '../technology.type';
import {TechService} from '../services/tech.service';


@Component({
  selector: 'app-tech-detail',
  template: `
    <div class="card">
      <div class="card-content">
        <div class="content">
          @if (tech() != null) {
            <h2 class="title">{{ tech()?.name }}</h2>
            <p class="subtitle">{{ tech()?.description }}</p>
            <p><strong>Category:</strong> {{ tech()?.category }}</p>
            <p><strong>Ring:</strong> {{ tech()?.ring }}</p>
            <p><strong>Published:</strong> {{ tech()?.published }}</p>
          } @else {
            <span>Tech not loaded</span>
          }
        </div>
      </div>
    </div>
  `
})
export class DetailTechComponent implements OnInit {
  tech = signal<Technology | null>(null);
  id = input.required<string>();
  techService = inject(TechService);

  ngOnInit(): void {
    this.techService.getTechnology(this.id()).subscribe(tech => this.tech.set(tech));
  }
}
