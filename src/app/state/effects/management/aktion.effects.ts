import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { ToastrService } from "ngx-toastr";
import { AKTION_START_SUCCESS, PAGE_SUCCESS, START_PAGE_AKTION } from "../../actions/management/page.actions";
import { CREATE_AKTION, PAGE_AKTION_SUCCESS, PERMISSION, REMOVE_AKTION, START_AKTION, UPDATE_AKTION } from "../../actions/management/aktion.actions";
import { AktionService } from "../../../service/management/action.service";



@Injectable({
    providedIn: 'root'
})

export class AktionEffect {

    private actions$ = inject(Actions);
    private aktionService = inject(AktionService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    aktion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_AKTION),
          switchMap((action) => 
           {
             return this.aktionService.actions(action?.pagee, action?.limit)
             .pipe(
                map((data) => 
                {
                  console.log(data)
                  const transformed = data?.data?.data?.map((item: any) => ({
                    ...item,
                    pageName: item?.page?.name,
                    modify: { count: 0, data: item?.aktions },
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
                  transformed.fromPlace = 
                  {
                    location: 'Aktion'
                  }
                  console.log(transformed)
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "all-action"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'all-action' }}))
                  return AKTION_START_SUCCESS({ page_actions: transformed });
                }
              ),
              catchError((errMsg: any) => 
                {
                  this.store.dispatch(SetErrorMessage({ msg: errMsg?.error?.message?.message, statusCode: errMsg?.error?.message?.statusCode, operation: "action-list"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400 }}))
                  return of();
                }
              )
            )
          })
      )
    })

    pageRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PAGE_SUCCESS),
          tap((action) => {
            // this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    newAktion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_AKTION),
          switchMap((action) => 
           {
            return this.aktionService.create(action.page, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'new-action' } })) 
                      this.store.dispatch(START_PAGE_AKTION({ page: action?.page }))
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
  

    upateAktion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_AKTION),
          switchMap((action) => 
           {
            return this.aktionService.update(action.action, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    {                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'updated-action' } })) 
                      this.store.dispatch(START_PAGE_AKTION({ page: action?.currentPage })),
                      this.toastr.success(data?.message)
                    },
                    error: (err) => { 
                      console.log("Wrong")
                      this.toastr.error( err?.error?.message, 'Error updating page'),
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


    removeAktion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE_AKTION),
          switchMap((action) => 
           {
            return this.aktionService.remove(action.page, action.action)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'remove-action'  } }))
                      this.store.dispatch(START_PAGE_AKTION({ page: action?.page }))
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


    permission$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PERMISSION),
          switchMap((action) => 
           {
            return this.aktionService.permission(action.role, action.rexource, action.page, action.action, action?.status)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      console.log(data)
                      // this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'remove-action'  } }))
                      // this.store.dispatch(START_PAGE_AKTION({ page: action?.page }))
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