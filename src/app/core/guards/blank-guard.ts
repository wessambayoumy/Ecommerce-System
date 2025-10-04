import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const blankGuard: CanActivateFn = (route, state) => {
  const cookiesService = inject(CookieService);
  let router = inject(Router);
  if (cookiesService.get('token')) {
    return router.parseUrl('/home');
  }
  return true;
};
