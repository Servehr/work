import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../service/auth.service';


export const requestInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    const authService = inject(AuthService)

    return (
      from(authService.IsUserInSession())
      .pipe(
        switchMap((token) => 
        {
          if(token)
          {
             const clonedRequest = req.clone({
                 setHeaders: {
                   Authorization: `Bearer ${token}`
                 }
             })
             return next(clonedRequest)
          }
          return next(req)
      }))
    )

};