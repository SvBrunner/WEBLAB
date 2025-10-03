import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {RadarSectionComponent} from './radar-section.component';
import {Ring, Technology} from '../technology.type';

@Component({
  selector: 'g[appRadarQuadrant]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadarSectionComponent],
  template: `
    <svg:g appRadarSection [color]="color()" [technologies]="adoptTech()" [section]="section()"
           [radius]="radiusses()[0]"
           [ring]="Ring.ADOPT"></svg:g>
    <svg:g appRadarSection [color]="color()" [technologies]="assessTech()" [section]="section()"
           [innerRadius]="radiusses()[0]"
           [radius]="radiusses()[1]"
           [fillOpacity]="0.8"
           [ring]="Ring.ASSESS"></svg:g>
    <svg:g appRadarSection [color]="color()" [technologies]="holdTech()" [section]="section()"
           [innerRadius]="radiusses()[1]"
           [radius]="radiusses()[2]"
           [fillOpacity]="0.5"
           [ring]="Ring.HOLD">
    </svg:g>
    <svg:g appRadarSection [color]="color()" [technologies]="trialTech()" [section]="section()"
           [innerRadius]="radiusses()[2]"
           [radius]="radiusses()[3]"
           [fillOpacity]="0.3"
           [ring]="Ring.TRIAL"></svg:g>
  `,
})
export class RadarQuadrantComponent {
  color = input.required<string>();
  section = input.required<number>();
  radius = input.required<number>();
  technologies = input.required<Technology[]>();
  adoptTech = computed(() => this.technologies() ? this.technologies().filter(el => el.ring === Ring.ADOPT) : []);
  assessTech = computed(() => this.technologies() ? this.technologies().filter(el => el.ring === Ring.ASSESS) : []);
  holdTech = computed(() => this.technologies() ? this.technologies().filter(el => el.ring === Ring.HOLD) : []);
  trialTech = computed(() => this.technologies() ? this.technologies().filter(el => el.ring === Ring.TRIAL) : []);

  radiusses = computed(() => this.radius() ? [this.radius() / 4, this.radius() / 2, (3 * this.radius()) / 4, this.radius()] : [0, 0, 0, 0]);
  protected readonly Ring = Ring;
}
