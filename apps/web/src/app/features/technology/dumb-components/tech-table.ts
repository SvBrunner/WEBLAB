import {Component, input, output} from '@angular/core';
import {Technology} from '../technology.type';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tech-table',
  imports: [
    RouterLink
  ],
  template: `
    <div class="table-container">

      <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
        <tr>
          <th>Name</th>
          <th class="is-not-displayed-mobile">Ring</th>
          <th class="is-not-displayed-mobile">Category</th>
          <th class="is-not-displayed-mobile">Description</th>
          <th>Published</th>
          <th class="has-text-right">Actions</th>
        </tr>
        </thead>

        <tbody>

          @for (tech of technologies(); track tech.name) {
            <tr>
              <td class="has-text-weight-semibold"><a routerLink="/technologies/detail/{{tech.id}}">{{ tech.name }}</a>
              </td>
              <td class="is-not-displayed-mobile">
                <span class="tag">{{ tech.ring }}</span>
              </td>
              <td class="is-not-displayed-mobile">
                <span class="tag">{{ tech.category }}</span>
              </td>
              <td class="is-not-displayed-mobile is-clipped" style="max-width: 28rem;">
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
                  @if (!tech.published) {
                    <button class="button is-primary is-light" (click)="onPublishClick(tech)"
                            aria-label="Publish {{ tech.name }}">
                      Publish
                    </button>
                  }
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
    </div>

  `,

  styles: `
    @media screen and (max-width: 768px) {
      .is-not-displayed-mobile {
        display: none !important;
      }
    }


  `
})
export class TechTable {
  technologies = input.required<Technology[]>();

  onDelete = output<Technology>();
  onPublish = output<Technology>();

  onDeleteClick(tech: Technology) {
    this.onDelete.emit(tech);
  }

  onPublishClick(tech: Technology) {
    this.onPublish.emit(tech);
  }
}
