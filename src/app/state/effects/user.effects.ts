import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, finalize, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { SetErrorMessage, SetLoadingStatus } from "../actions/spinner.action";
import AppState from "../app.state";
import { PROFILE_SUCCESS, SEARCH_SUCCESS, SERARCH_USER, START_PROFILE, SUBSCRIBE } from "../actions/user.actions";
import { UserService } from "../../service/user.service";
import { USER_PROFILE_SUCCESS, USER_SEARCH_START } from "../constants/user";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class UserEffect {

    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private store = inject(Store<AppState>);
    private router = inject(Router)
    // private toastr!: ToastrService
    constructor(private toastr: ToastrService){}   

    currentUrl!: string;

  
    profile$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_PROFILE),
          switchMap((action) => 
           {
            return this.userService.profile(action.user)
             .pipe(
                map((data) => {
                this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "user-profile"  }))
                this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                return PROFILE_SUCCESS({ user: data?.user });
              }),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "user-profile"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
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

  
    search$ = createEffect(() => 
     {
       return this.actions$.pipe(
        ofType(SERARCH_USER),
          switchMap((action) => 
           {
            return this.userService.search(action.keyword)
             .pipe(
                map((data) => 
                {
                  const result = data ? data?.data : ['1']
                  const status = data ? 200 : 400
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "search-result"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: status  } }))
                  return SEARCH_SUCCESS({ profile: result });
              }),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "user-profile"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                  return of();
                }
              )
            )
          })
      )
    })
  
    newsletter$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SUBSCRIBE),
          switchMap((action) => 
           {
            return this.userService.newsletter(action.email)
             .pipe(
                tap(
                  {
                    next: (data) => { this.toastr.success(data?.message) },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error subscribing'),
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                    },
                    complete: () => { 
                        this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                    }
                  }
                )
                // finalize(() => 
                //   {
                    
                //   }
                // )
              )
           }
        )
      )
    }, { dispatch: false })


}