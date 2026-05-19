import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { from, of } from "rxjs";
import { Router } from "@angular/router";
import { FORGOT_SUCCESS, LOGIN_SUCCESS, PASS_THE_TOKEN, REGISTER_SUCCESS, RESET_PASSWORD_SUCCESS, START_LOGIN, START_REGISTER, START_RESET_PASSWORD, TOKEN_FAILED, TOKEN_IS_PASSED } from "../actions/auth.actions";
import { Store } from "@ngrx/store";
import { AuthService } from "../../service/auth.service";
import { SetErrorMessage, SetLoadingStatus } from "../actions/spinner.action";
import AppState from "../app.state";
import { AUTH_FORGOT_START, AUTH_FORGOT_SUCCESS, AUTH_RESET_PASSWORD_START, LOGOUT_SUCCESS } from "../constants/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthEffect {

    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private store = inject(Store<AppState>);
    private router = inject(Router)


    login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_LOGIN),
          switchMap((action) => {
            return this.authService.login(action.email, action.password)
             .pipe(
                map((data) => {
                  console.log(data)
                  console.log("Talk to me")
                  let stringIt = JSON.stringify(data?.data)
                  let parsetData = JSON.parse(stringIt)
                  Object.assign(parsetData?.user, { token: data?.data?.token })
                  const user = this.authService.formatUserResponse(data?.message, parsetData?.user)
                  this.store.dispatch(SetErrorMessage({ msg: data?.message, statusCode: data?.statusCode, operation: "authenticate-uxer"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                  return LOGIN_SUCCESS({ auth: user });
              }),
              catchError((err: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: err.error?.message, statusCode: err.error?.statusCode, operation: "authenticate-user"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400 }}))
                  return of();
                }
              )
            )
          })      
        )
    })

    loginRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LOGIN_SUCCESS),
          tap((action) => {
            this.router.navigate(['dashboard'])
          })
        )
    }, { dispatch: false })

    register$ = createEffect(() => {
       return this.actions$.pipe(
          ofType(START_REGISTER),
          exhaustMap((action) => {
             return this.authService.register(action?.firstname, action?.surname, action?.phone, action?.email, action?.category, action?.password, action?.cPassword, action?.ninImage, action?.passportImage)
             .pipe(
                map((data) => {
                  this.store.dispatch(SetErrorMessage({ msg: data?.message, statusCode: data?.statusCode, operation: "register-user"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                   return REGISTER_SUCCESS({ data: data?.data })
                }),
                catchError((err: any) => 
                  {
                    this.store.dispatch(SetErrorMessage({ msg: err.error?.message, statusCode: err.error?.statusCode, operation: "register-user"  }))
                    this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                    return of();
                  }
                )
             )
          })
       )
    })

    registerRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REGISTER_SUCCESS, LOGOUT_SUCCESS, FORGOT_SUCCESS, RESET_PASSWORD_SUCCESS),
          tap((action) => {
            this.router.navigate(['auth/login'])
          })
        )
    }, { dispatch: false })

    checkUserSession$ = createEffect(() => 
       this.actions$.pipe(
         ofType(PASS_THE_TOKEN),
         switchMap(() => 
           from(this.authService.IsUserInSession()).pipe(
             map((data) => 
              {
                return TOKEN_IS_PASSED({ token: data })
              }
            ),
            catchError(() => of(TOKEN_FAILED({ msg: null })))
           )
         )
       )
    )

    forgot$ = createEffect(() => {
       return this.actions$.pipe(
          ofType(AUTH_FORGOT_START),
          exhaustMap((action) => {
             return this.authService.forgot(action?.email)
             .pipe(
                map((data) => {
                  console.log(data)
                  console.log(data?.data)
                  this.store.dispatch(SetErrorMessage({ msg: data?.message, statusCode: data?.statusCode, operation: "forgot-user"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                  return FORGOT_SUCCESS()
                }),
                catchError((err: any) => 
                  {
                    this.store.dispatch(SetErrorMessage({ msg: err.error?.message, statusCode: err.error?.statusCode, operation: "forgot-user"  }))
                    this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                    return of();
                  }
                )
             )
          })
       )
    })

    newPassword$ = createEffect(() => {
       return this.actions$.pipe(
          ofType(START_RESET_PASSWORD),
          exhaustMap((action) => {
             return this.authService.resetPassword(action?.user, action?.password, action?.cPassword)
             .pipe(
                map((data) => {
                  this.store.dispatch(SetErrorMessage({ msg: data?.message, statusCode: data?.statusCode, operation: "reset-user-password"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                  return RESET_PASSWORD_SUCCESS()
                }),
                catchError((err: any) => 
                  {
                    this.store.dispatch(SetErrorMessage({ msg: err.error?.message, statusCode: err.error?.statusCode, operation: "reset-user-password"  }))
                    this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
                    return of();
                  }
                )
             )
          })
       )
    })

}