import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { ToastrService } from "ngx-toastr";
import { CREATE_ROLE, REMOVE_ROLE, ROLE_SUCCESS, START_ROLE, UPDATE_ROLE } from "../../actions/management/role.actions";
import { RoleService } from "../../../service/management/role.service";


@Injectable({
    providedIn: 'root'
})

export class RoleEffect {

    private actions$ = inject(Actions);
    private roleService = inject(RoleService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    role$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_ROLE),
          switchMap((action) => 
           {
            return this.roleService.roles(action?.page, action?.limit)
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
                  return ROLE_SUCCESS({ role: transformed });
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

    roleRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ROLE_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    roleCategory$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_ROLE),
          switchMap((action) => 
           {
            return this.roleService.create(action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_ROLE({ page: action.page, limit: action.perPage }))
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
  

    upateCategory$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_ROLE),
          switchMap((action) => 
           {
            return this.roleService.update(action.role, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_ROLE({ page: action.page, limit: action.perPage }))
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
        ofType(REMOVE_ROLE),
          switchMap((action) => 
           {
            return this.roleService.remove(action.role)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      this.store.dispatch(START_ROLE({ page: action.page, limit: action.limit }))
                      },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error deleting')
                      // this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
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