import {Component, effect, inject, input, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category, Ring, Technology} from '../technology.type';

@Component({
  selector: 'app-tech-form',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    @if (error()) {
      <div class="notification is-danger">{{ error() }}</div>
    }
    <form [formGroup]="techForm" (ngSubmit)="onSubmit()">
      <div class="field is-horizontal">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" formControlName="name">
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" for="description">Description</label>
        <div class="control">
          <textarea rows="5" class="textarea" id="description" formControlName="description"></textarea>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label" for="ring">Ring</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="ring" formControlName="ring">
                  <option [ngValue]="null" disabled>Select ring…</option>
                  @for (value of RING_VALUES; track value) {
                    <option [ngValue]="value">{{ value }}</option>
                  }
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label" for="category">Category</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="category" formControlName="category">
                  <option [ngValue]="null" disabled>Select Category…</option>
                  @for (value of CATEGORY_VALUES; track value) {
                    <option [ngValue]="value">{{ value }}</option>
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input class="button is-primary" type="submit" [disabled]="!techForm.valid" value="Save">
        </div>
      </div>
    </form>
  `,
})
export class TechForm {
  private fb = inject(FormBuilder);

  RING_VALUES = Object.values(Ring) as readonly Ring[];
  CATEGORY_VALUES = Object.values(Category) as readonly Category[];

  technology = input<Partial<Technology> | null>(null);

  techForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    ring: this.fb.control<Ring | null>(null),
    category: this.fb.control<Category | null>(null)
  });
  onFormSubmitted = output<Technology>();
  error = input.required<string | null>();

  onSubmit() {
    if (this.techForm.invalid) return;
    this.onFormSubmitted.emit(this.techForm.getRawValue() as Technology);
  }

  private _syncFromInput = effect(() => {
    const tech = this.technology();
    if (!tech) return;

    this.techForm.patchValue({
      name: tech.name ?? '',
      description: tech.description ?? '',
      ring: tech.ring ?? null,
      category: tech.category ?? null,
    });

    this.techForm.markAsPristine();
    this.techForm.markAsUntouched();
  });
}
