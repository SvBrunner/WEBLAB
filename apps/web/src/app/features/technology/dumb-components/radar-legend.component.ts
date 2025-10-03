import {Component, input} from '@angular/core';

@Component(
  {
    selector: 'radar-legend',
    template: `
      <div class="box">
        <h5 class="title is-6 mb-3">Legend</h5>
        <ul>
          <li [style.color]="platformColor()">Platforms</li>
          <li [style.color]="toolColor()">Tools</li>
          <li [style.color]="languageColor()">Languages & Frameworks</li>
          <li [style.color]="techniqueColor()">Techniques</li>
        </ul>
      </div>
    `,
  }
)
export class RadarLegendComponent {
  platformColor = input.required<string>();
  toolColor = input.required<string>();
  languageColor = input.required<string>();
  techniqueColor = input.required<string>();
}
