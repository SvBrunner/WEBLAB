import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginFormComponent} from '../dumb-components/login-form.component';
import {LoginResponse, User} from '../user.type';
import {AuthService} from '../services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-login',
  template: `
    <app-login-form (submitAction)="onSubmit($event)"/>
  `,
  imports: [
    ReactiveFormsModule,
    LoginFormComponent
  ],
})
export class UserLoginComponent {

  private authService = inject(AuthService);
  private location: Location = inject(Location);

  onSubmit(user: User) {
    console.log(user);
    this.authService.login(user.username, user.password).subscribe({
      next: (response) => {
        const token = (response.body as LoginResponse).access_token;
        this.authService.setAccessToken(token);
        this.location.back();
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
