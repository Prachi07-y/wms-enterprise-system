import {
  inject
} from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService }
from '../services/auth';

export const authGuard:
CanActivateFn = (
  route,
  state
) => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  // CHECK LOGIN

  if (
    !authService.isLoggedIn()
  ) {

    router.navigate([
      '/login'
    ]);

    return false;

  }

  // CHECK ROLE

  const expectedRole =
    route.data?.['role'];

  // IF ROUTE REQUIRES ROLE

  if (
    expectedRole &&
    authService.getRole()
      !== expectedRole
  ) {

    router.navigate([
      '/dashboard'
    ]);

    return false;

  }

  return true;

};