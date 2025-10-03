import {Component, inject, signal, Signal, WritableSignal} from '@angular/core';
import {RadarQuadrantComponent} from '../dumb-components/radar-quadrant.component';
import {TechService} from '../services/tech.service';
import {Category, Ring, Technology} from '../technology.type';
import {RadarLegendComponent} from '../dumb-components/radar-legend.component';

@Component({
  selector: 'app-tech-radar',
  standalone: true,
  imports: [RadarQuadrantComponent, RadarLegendComponent],
  template: `
    <div class="container is-flex-desktop is-flex-direction-row is-align-items-center">
      <svg viewBox="0 0 800 800">
        <g [technologies]="platformsTech()" appRadarQuadrant [color]="platformColor" [section]="1" [radius]="320"></g>
        <g [technologies]="toolsTech()" appRadarQuadrant [color]="toolColor" [section]="2" [radius]="320"></g>
        <g [technologies]="languagesTech()" appRadarQuadrant [color]="languageColor" [section]="3" [radius]="320"></g>
        <g [technologies]="techniquesTech()" appRadarQuadrant [color]="techniqueColor" [section]="4" [radius]="320"></g>
      </svg>
      <radar-legend [languageColor]="languageColor" [platformColor]="platformColor" [toolColor]="toolColor"
                    [techniqueColor]="techniqueColor"/>
    </div>
  `
})
export class TechRadarComponent {

  techService = inject(TechService);
  techniquesTech: WritableSignal<Technology[]> = signal([]);
  platformsTech: WritableSignal<Technology[]> = signal([]);
  toolsTech: WritableSignal<Technology[]> = signal([]);
  languagesTech: WritableSignal<Technology[]> = signal([]);
  techniqueColor = '#DB7093';
  platformColor = '#8E7CC3'
  toolColor = '#70ADAA'
  languageColor = '#E9B96E'

  constructor() {
    this.techService.getTechnologies().subscribe(techs => {
      techs = techs.filter(tech => tech.published);
      this.techniquesTech.set(techs.filter(tech => tech.category === Category.TECHNIQUES));
      this.platformsTech.set(techs.filter(tech => tech.category === Category.PLATFORMS));
      this.toolsTech.set(techs.filter(tech => tech.category === Category.TOOLS));
      this.languagesTech.set(techs.filter(tech => tech.category === Category.LANGUAGES_FRAMEWORKS));
    });
  }
}
