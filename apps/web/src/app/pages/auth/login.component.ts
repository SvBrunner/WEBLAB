import {Component, input} from '@angular/core';
import {UserLoginComponent} from '../../features/auth/smart-container/user-login.component';

@Component({
  selector: 'app-login',
  template: `
    <app-user-login [redirectTo]="redirectTo()"/>
  `,
  imports: [
    UserLoginComponent
  ],
})
export class LoginComponent {
  redirectTo = input('/');
}
