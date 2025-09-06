import {Component} from '@angular/core';
import {UserLoginComponent} from '../../features/auth/smart-container/user-login.component';

@Component({
  selector: 'app-login',
  template: `
    <h1>Login</h1>
    <app-user-login/>
  `,
  imports: [
    UserLoginComponent
  ],
})
export class LoginComponent {

}
