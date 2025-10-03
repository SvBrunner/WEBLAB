import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './features/auth/services/auth.service';
import {Role} from './features/auth/roles.type';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.hasRole(Role.ADMIN);
};
