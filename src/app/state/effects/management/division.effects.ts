import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { ToastrService } from "ngx-toastr";
import { DivisionService } from "../../../service/management/division.service";
import { CREATE_DIVISION, DIVISION_SUCCESS, LOAD_DIVISIONS, REMOVE_DIVISION, UPDATE_DIVISION } from "../../actions/management/division.actions.";


@Injectable({
    providedIn: 'root'
})

export class DivisionEffect {

    private actions$ = inject(Actions);
    private divisionService = inject(DivisionService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    division$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LOAD_DIVISIONS),
          switchMap((action) => 
           {
            return this.divisionService.divisions(action?.category, action?.page, action?.limit)
             .pipe(
                map((data) => 
                {             
                  const transformed = data?.data?.data?.map((item: any) => ({
                    ...item,
                    change: item?._id,
                    remove: item?._id
                  }))
                  transformed.pagination = 
                  {
                    currentPage: data?.data?.currentPage,
                    totalPages: data?.data?.totalPages,
                    totalDocs: data?.data?.totalDocs,
                    hasNextPage: data?.data?.hasNextPage,
                    hasPrevPage: data?.data?.hasPrevPage
                  }
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "all-category"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 }}))
                  return DIVISION_SUCCESS({ division: transformed });
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

    divisionRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(DIVISION_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    newDivision$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_DIVISION),
          switchMap((action) => 
           {
            return this.divisionService.create(action.category, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      // this.store.dispatch({ type: action.action })
                      this.store.dispatch(LOAD_DIVISIONS({ category: action.category, page: Number(action.page), limit: Number(action.perPage) }))
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error create new category'),
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
  

    upateDivision$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_DIVISION),
          switchMap((action) => 
           {
            return this.divisionService.update(action.division, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(LOAD_DIVISIONS({ category: action.category, page: Number(action.page), limit: Number(action.perPage) }))
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error updating category'),
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


    remove$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE_DIVISION),
          switchMap((action) => 
           {
            return this.divisionService.remove(action.division)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      this.store.dispatch(LOAD_DIVISIONS({ category: action.category, page: Number(action.page), limit: Number(action.limit) }))
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