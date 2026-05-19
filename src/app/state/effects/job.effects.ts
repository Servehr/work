import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { SetErrorMessage, SetLoadingStatus } from "../actions/spinner.action";
import AppState from "../app.state";
import { PROFILE_SUCCESS, SERARCH_USER, START_PROFILE } from "../actions/user.actions";
import { USER_PROFILE_SUCCESS, USER_SEARCH_START } from "../constants/user";
import { JobService } from "../../service/job.service";
import { RETRIEVE_CATEGORY } from "../actions/job.actions";
import { START_SUGGESTION, SUGGESTION_SUCCESS } from "../actions/suggestion.actions";

@Injectable({
    providedIn: 'root'
})

export class JobEffect {

    private actions$ = inject(Actions);
    private jobService = inject(JobService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    currentUrl!: string;
  
    category$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_SUGGESTION),
          switchMap((action) => 
           {
            return this.jobService.suggestions(action?.url)
             .pipe(
                map((data) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "all-category"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 }}))
                  return SUGGESTION_SUCCESS({ results: data?.data });
                }
              ),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "user-profile"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400 }}))
                  return of();
                }
              )
            )
          })
      )
    })

    categoryRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(USER_PROFILE_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false })


    jobPost$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SERARCH_USER),
          switchMap((action) => 
           {
            return this.jobService.postJob(action)
             .pipe(
                map((data) => {
                this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "post-job"  }))
                this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 }}))
                return PROFILE_SUCCESS({ user: data?.user });
              }),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "user-profile"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400 }}))
                  return of();
                }
              )
            )
          })
      )
    })    

}