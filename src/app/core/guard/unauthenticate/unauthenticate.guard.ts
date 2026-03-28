import { inject } from '@angular/core';
import { CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { catchError, Observable, of, tap } from 'rxjs';


export const unauthenticateGuard: CanActivateChildFn = (): Observable<boolean | UrlTree> => 
{
   const authService = inject(AuthService)
   const router = inject(Router)  
   
   return authService.isUnAuthenticated$()
          .pipe(
             tap((token) => {
                if(token)
                {console.log(token)
                   router.navigate(['/dashboard'])
                }
             }),
             catchError(() => {
               router.navigate(['/home'])
               return of(false)
             })
          )

};
