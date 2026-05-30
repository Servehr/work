import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { ToastrService } from "ngx-toastr";
import { PageService } from "../../../service/management/page.service";
import { CONNECT_PAGE_TO_RESOURCE, CREATE_PAGE, PAGE_SUCCESS, REMOVE_PAGE, START_PAGE, UPDATE_PAGE } from "../../actions/management/page.actions";
import { PAGE_TO_RESOURCE } from "../../constants/management/page";
import { START_REXOURCE } from "../../actions/management/rexource.actions";



@Injectable({
    providedIn: 'root'
})

export class PageEffect {

    private actions$ = inject(Actions);
    private pageService = inject(PageService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    page$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_PAGE),
          switchMap((action) => 
           {
            return this.pageService.pages(action?.page, action?.limit)
             .pipe(
                map((data) => 
                {
                  const transformed = data?.data?.data?.map((item: any) => ({
                    ...item,
                    connect: item?._id,
                    disconnect: item?._id,
                    action: item?._id,
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
                  console.log(transformed)
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "all-resource"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'rexource' }}))
                  return PAGE_SUCCESS({ pages: transformed });
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

    pageRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PAGE_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    newPage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_PAGE),
          switchMap((action) => 
           {
            return this.pageService.create(action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200, page: 'rexource' } })) 
                      this.store.dispatch(START_PAGE({ page: action.page, limit: action.perPage }))
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
  

    upatePage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_PAGE),
          switchMap((action) => 
           {
            return this.pageService.update(action.pagee, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_PAGE({ page: action.page, limit: action.perPage }))
                    },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error updating resource'),
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


    removePage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE_PAGE),
          switchMap((action) => 
           {
            return this.pageService.remove(action.pagee)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      this.store.dispatch(START_PAGE({ page: action.page, limit: action.limit }))
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
    
  
    connectPageToResource$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CONNECT_PAGE_TO_RESOURCE),
          switchMap((action) => 
           {
            return this.pageService.connectPageToResource(action?.resource, action?.pagee)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      // this.store.dispatch(START_PAGE({ page: action.page, limit: action.limit }))
                      this.store.dispatch(START_REXOURCE({ page: action.page, limit: action.limit }))
                      },
                    error: (err) => { 
                      console.log(err)
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