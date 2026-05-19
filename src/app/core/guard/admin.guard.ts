import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  
  if(authService.isAdmin())
  {
     return true
  }

  return router.createUrlTree(['auth/login']);
};
