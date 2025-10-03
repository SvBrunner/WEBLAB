import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  computed,
  input,
} from '@angular/core';
import {Ring, Technology} from '../technology.type';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'g[appRadarSection]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:path
      [attr.d]="d()"
      [attr.fill]="color()"
      [attr.fill-opacity]="fillOpacity()"
      [attr.stroke]="stroke()"
      [attr.stroke-width]="strokeWidth()"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"

    >
      <title>{{ ring() }}</title>
    </svg:path>
    @for (technology of technologies(); track technology.id; let i = $index) {
      <svg:a routerLink="/technologies/detail/{{ technology.id }}">
        <svg:circle
          [attr.cx]="polarPos(i, technologies().length, radius(), innerRadius())[0]"
          [attr.cy]="polarPos(i, technologies().length, radius(), innerRadius())[1]"
          r="5"
          stroke-width="0"
          fill="yellow"
        ><title>{{ technology.name }}</title></svg:circle>
      </svg:a>
    }
  `,
  imports: [
    RouterLink
  ],
  styles: [`
    :host {
      opacity: 1;
    }
  `]
})
export class RadarSectionComponent {
  color = input.required<string>();
  section = input.required<number>(); // 1..4 in your current usage
  technologies = input.required<Technology[]>();
  ring = input.required<Ring>()

  cx = input(377);
  cy = input(377);
  radius = input.required<number>(); // outer radius
  innerRadius = input(0);       // 0 = pie slice to center; >0 = donut slice
  sweepDeg = input(90);      // arc size; keep 90 for your quadrants
  fillOpacity = input(1);
  stroke = input('#000');  // subtle outline to clarify shape boundaries
  strokeWidth = input(0.75);

  private rotation = computed(() => (this.section() - 1) * this.sweepDeg());

  @HostBinding('attr.transform')
  get transformAttr() {
    return `translate(${this.cx()}, ${this.cy()}) rotate(${this.rotation()})`;
  }

  polarPos(index: number, total: number, outerRadius: number, innerRadius: number): [number, number] {
    const padding = 15;
    innerRadius = Math.max(0, innerRadius + padding);
    outerRadius = Math.max(innerRadius, outerRadius - padding);
    const ratio = total > 1 ? index / (total - 1) : 0.5;
    const currentRadius = innerRadius + (outerRadius - innerRadius) * ratio;
    const angle = (Math.abs(this.sweepDeg()) / (total + 1) * (index + 1)) - 90;
    return polar(currentRadius, angle);
  }

  d = computed(() => {
    const R = Math.max(0, this.radius());
    const r = Math.max(0, Math.min(this.innerRadius(), R)); // clamp
    const a = this.sweepDeg();

    const start = 0;
    const end = -a;

    const largeArc = Math.abs(a) > 180 ? 1 : 0;
    const sweepFlagOuter = 0; // CCW (matches your original path)
    const sweepFlagInner = 1; // reverse direction for inner arc

    const [sx, sy] = polar(R, start);
    const [ex, ey] = polar(R, end);

    if (r <= 0) {
      // Simple pie slice (to the center), like your original
      return [
        `M ${sx} ${sy}`,
        `A ${R} ${R} 0 ${largeArc} ${sweepFlagOuter} ${ex} ${ey}`,
        `L 0 0`,
        `Z`
      ].join(' ');
    }

    const [ixs, iys] = polar(r, end);
    const [ixe, iye] = polar(r, start);

    return [
      `M ${sx} ${sy}`,
      `A ${R} ${R} 0 ${largeArc} ${sweepFlagOuter} ${ex} ${ey}`,
      `L ${ixs} ${iys}`,
      `A ${r} ${r} 0 ${largeArc} ${sweepFlagInner} ${ixe} ${iye}`,
      `Z`
    ].join(' ');
  });
}

function polar(radius: number, degrees: number): [number, number] {
  const t = toRad(degrees);
  return [round(radius * Math.cos(t)), round(radius * Math.sin(t))];
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function round(n: number) {
  return +n.toFixed(3);
}
