import {Component, inject, input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from '../dumb-components/login-form.component';
import {LoginResponse, User} from '../user.type';
import {AuthService} from '../services/auth.service';
import {BackService} from '../../../pages/back.service';
import {Router} from '@angular/router';
import {routes} from '../../../config/routes.config';
import {ArgumentOutOfRangeError} from 'rxjs';

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
  private router: Router = inject(Router);
  redirectTo = input.required<string>()

  onSubmit(user: User) {
    console.log(user);
    this.authService.login(user.username, user.password).subscribe({
      next: (response) => {
        const token = (response.body as LoginResponse).access_token;
        this.authService.setAccessToken(token);
        this.router.navigateByUrl(this.redirectTo());
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
