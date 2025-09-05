import {Component, effect, inject, input, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category, Ring, Technology} from '../smart-container/technology.type';

@Component({
  selector: 'app-tech-form',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="techForm" (ngSubmit)="onSubmit()">
      <div class="field is-horizontal">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" formControlName="name">
          </div>
        </div>

        <div class="field ml-4">
          <input id="published" type="checkbox" class="switch is-rounded is-info" formControlName="published">
          <label for="published">Published</label>
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

  // Optional input; make it `input.required<Partial<Technology>>()` if the parent always provides it.
  technology = input<Partial<Technology> | null>(null);

  // Tip: use nonNullable to avoid undefined creeping in.
  techForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    ring: this.fb.control<Ring | null>(null),
    category: this.fb.control<Category | null>(null),
    published: false,
  });

  // 🔁 React to late/changed input values
  // Runs at least once; patches whenever `technology()` changes.
  private _syncFromInput = effect(() => {
    const tech = this.technology();
    if (!tech) return;

    this.techForm.patchValue({
      name: tech.name ?? '',
      description: tech.description ?? '',
      ring: tech.ring ?? null,
      category: tech.category ?? null,
      published: tech.published ?? false,
    });

    // Optional: reset pristine/untouched when swapping records (e.g., editing a different item)
    this.techForm.markAsPristine();
    this.techForm.markAsUntouched();
  });

  onFormSubmitted = output<Technology>();

  onSubmit() {
    if (this.techForm.invalid) return;
    this.onFormSubmitted.emit(this.techForm.getRawValue() as Technology);
  }
}
