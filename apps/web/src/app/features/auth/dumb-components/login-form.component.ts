import {Component, inject, input, output, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../user.type';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-form',
  template: `
    <section class="section">
      <div class="container" style="max-width: 420px;">
        <h1 class="title is-4 has-text-centered">Sign in</h1>
        <div class="box">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <div class="field">
              <label class="label" for="username">Username</label>
              <div class="control has-icons-left">
                <input
                  id="username"
                  class="input"
                  type="text"
                  placeholder="you@example.com"
                  formControlName="username"
                  autocomplete="username"
                  required
                />
                <span class="icon is-small is-left">
              <i class="fas fa-user" aria-hidden="true"></i>
            </span>
              </div>
            </div>

            <div class="field">
              <label class="label" for="password">Password</label>
              <div class="control has-icons-left" style="position: relative;">
                <input
                  id="password"
                  class="input"
                  [type]="showPassword() ? 'text' : 'password'"
                  placeholder="••••••••"
                  formControlName="password"
                  autocomplete="current-password"
                  required
                />
                <span class="icon is-small is-left">
              <i class="fas fa-lock" aria-hidden="true"></i>
            </span>
                <button
                  type="button"
                  class="button is-white is-small"
                  aria-label="Toggle password visibility"
                  (click)="togglePassword()"
                  style="position:absolute; right:0.25rem; top:0.25rem;"
                >
                  {{ showPassword() ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary is-fullwidth"
                  type="submit"
                  [disabled]="form.invalid"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  `,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  submitAction = output<User>();
  error = input<string>();

  showPassword = signal(false);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Convenience refs for template
  username = this.form.controls.username;
  password = this.form.controls.password;

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitAction.emit(this.form.value as User);
  }
}
