import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { SetErrorMessage, SetLoadingStatus } from "../actions/spinner.action";
import AppState from "../app.state";
import { PROFILE_SUCCESS, START_PROFILE } from "../actions/user.actions";
import { UserService } from "../../service/user.service";
import { USER_PROFILE_SUCCESS } from "../constants/user";

@Injectable({
    providedIn: 'root'
})

export class UserEffect {

    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    currentUrl!: string;
  
    profile$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_PROFILE),
          exhaustMap((action) => {
            console.log("+++")
            return this.userService.profile(action.user)
             .pipe(
                map((data) => {
                console.log(data)
                this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "user-profile"  }))
                this.store.dispatch(SetLoadingStatus({ loading: false }))
                return PROFILE_SUCCESS({ user: data?.user });
              }),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "user-profile"  }))
                  this.store.dispatch(SetLoadingStatus({ loading: false }))
                  return of();
                }
              )
            )
          })
      )
    })

    profileRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(USER_PROFILE_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false })


}