import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { ToastrService } from "ngx-toastr";
import { CREATE_DEPARTMENT, DEPARTMENT_SUCCESS, REMOVE_DEPARTMENT, START_DEPARTMENT, UPDATE_DEPARTMENT } from "../../actions/management/department.actions";
import { RexourceService } from "../../../service/management/rexource.service";
import { CREATE_REXOURCE, REMOVE_REXOURCE, REXOURCE_SUCCESS, START_REXOURCE, UPDATE_REXOURCE } from "../../actions/management/rexource.actions";


@Injectable({
    providedIn: 'root'
})

export class RexourceEffect {

    private actions$ = inject(Actions);
    private rexorceService = inject(RexourceService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    rexource$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_REXOURCE),
          switchMap((action) => 
           {
            return this.rexorceService.rexources(action?.page, action?.limit)
             .pipe(
                map((data) => 
                {             console.log(data)
                  const transformed = data?.data?.data?.map((item: any) => ({
                    ...item,
                    rexourcePages: { count: item?.pages?.length, data: item?.pages },
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
                  console.log(transformed)
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "all-department"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'rexource' }}))
                  return REXOURCE_SUCCESS({ rexources: transformed });
                }
              ),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "department-list"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400 }}))
                  return of();
                }
              )
            )
          })
      )
    })

    rexourceRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REXOURCE_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    newRexource$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_REXOURCE),
          switchMap((action) => 
           {
            return this.rexorceService.create(action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'rexource' } })) 
                      this.store.dispatch(START_REXOURCE({ page: action.page, limit: action.perPage }))
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error create new department'),
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
  

    upateRexource$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_REXOURCE),
          switchMap((action) => 
           {
            return this.rexorceService.update(action.rexource, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_REXOURCE({ page: action.page, limit: action.perPage }))
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error updating department'),
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


    removeRexource$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE_REXOURCE),
          switchMap((action) => 
           {
            return this.rexorceService.remove(action.rexource)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      this.store.dispatch(START_REXOURCE({ page: action.page, limit: action.limit }))
                      },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error deleting')
                    },
                    complete: () => {
                    
                    },
                  }
                )
              )
           }
        )
      )
    }, { dispatch: false, functional: true })     

}