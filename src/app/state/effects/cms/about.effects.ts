import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { ToastrService } from "ngx-toastr";
import { AboutService } from "../../../service/cms/about.service";
import { ABOUT_SUCCESS, CREATE_ABOUT, REMOVE_ABOUT, START_ABOUT, UPDATE_ABOUT } from "../../actions/cms/about.actions";


@Injectable({
    providedIn: 'root'
})

export class AboutUsEffect {

    private actions$ = inject(Actions);
    private aboutService = inject(AboutService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    aboutUs$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_ABOUT),
          switchMap(() => 
           {
            return this.aboutService.about()
             .pipe(
                map((data) => 
                {
                  console.log(data)
                  console.log(data?.data)
                  console.log(data?.data?.aboutus)
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'write-about' }}))
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "write-about"  }))
                  return ABOUT_SUCCESS({ about: data?.data })
                }
              ),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "resource-list"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400 }}))
                  return of();
                }
              )
            )
          })
      )
    })

    aboutUsRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ABOUT_SUCCESS),
          tap((action) => {
            // console.log(window.location.pathname)
            // this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    createAboutUs$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_ABOUT),
          switchMap((action) => 
           {
            return this.aboutService.create(action.title, action.aboutus, action.images)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'rexource' } })) 
                      this.store.dispatch(START_ABOUT())
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error create new resource'),
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                    },
                    complete: () => { 
                    }
                  }
                )
              )
          })
      )
    }, { dispatch: false, functional: true })
  

    upateAboutUs$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_ABOUT),
          switchMap((action) => 
           {
            return this.aboutService.update(action.about, action.title, action.aboutus, action.images)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'write-about' }}))
                      this.store.dispatch(START_ABOUT())
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error updating'),
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                    },
                    complete: () => { 
                    }
                  }
                )
              )
          })
      )
    }, { dispatch: false, functional: true })


    removeAbout$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE_ABOUT),
          switchMap((action) => 
           {
            return this.aboutService.remove(action.about)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'delete-about-us' }}))
                      this.store.dispatch(START_ABOUT())
                      },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error deleting')
                      // this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                    },
                    complete: () => {
                      // this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      // this.store.dispatch(LOAD_DIVISIONS({ category: this.divisions(), page: Number(this.currentPage()), limit: Number(this.perPage()) }))
                    },
                  }
                )
              )
           }
        )
      )
    }, { dispatch: false, functional: true })     
  
 
}