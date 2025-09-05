import {Component, input, output} from '@angular/core';
import {Technology} from '../smart-container/technology.type';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tech-table',
  imports: [
    RouterLink
  ],
  template: `
    <!-- technologies-table.component.html -->
    <table class="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
      <tr>
        <th>Name</th>
        <th>Ring</th>
        <th>Category</th>
        <th>Description</th>
        <th>Published</th>
        <th class="has-text-right">Actions</th>
      </tr>
      </thead>

      <tbody>

        @for (tech of technologies(); track tech.name) {
          <tr>
            <td class="has-text-weight-semibold">{{ tech.name }}</td>
            <td>
              <span class="tag">{{ tech.ring }}</span>
            </td>
            <td>
              <span class="tag">{{ tech.category }}</span>
            </td>
            <td class="is-clipped" style="max-width: 28rem;">
            <span class="is-size-7 has-text-grey-dark">
              {{ tech.description }}
            </span>
            </td>
            <td>
            <span class="tag" [class.is-success]="tech.published">
              {{ tech.published ? 'Yes' : 'No' }}
            </span>
            </td>
            <td class="has-text-right">
              <div class="buttons are-small is-right">
                <a [routerLink]="['/technologies', 'edit',tech.id]" class="button is-info is-light"
                   aria-label="Edit {{ tech.name }}">
                  Edit
                </a>
                <button class="button is-danger is-light" (click)="onDeleteClick(tech)"
                        aria-label="Delete {{ tech.name }}">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        }

      </tbody>
    </table>

  `
})
export class TechTable {
  technologies = input.required<Technology[]>();

  onDelete = output<Technology>()

  onDeleteClick(tech: Technology) {
    this.onDelete.emit(tech);
  }
}
