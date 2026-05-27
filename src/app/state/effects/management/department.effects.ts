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
import { DepartmentService } from "../../../service/management/department.service";


@Injectable({
    providedIn: 'root'
})

export class DepartmentEffect {

    private actions$ = inject(Actions);
    private departmentService = inject(DepartmentService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    department$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_DEPARTMENT),
          switchMap((action) => 
           {
            return this.departmentService.departments(action?.page, action?.limit)
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
                  this.store.dispatch(SetErrorMessage({ msg: "successful", statusCode: 200, operation: "all-department"  }))
                  this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 }}))
                  return DEPARTMENT_SUCCESS({ departments: transformed });
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

    departmentRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(DEPARTMENT_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    newDepartment$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_DEPARTMENT),
          switchMap((action) => 
           {
            return this.departmentService.create(action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_DEPARTMENT({ page: action.page, limit: action.perPage }))
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
  

    upateDepartment$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UPDATE_DEPARTMENT),
          switchMap((action) => 
           {
            return this.departmentService.update(action.department, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_DEPARTMENT({ page: action.page, limit: action.perPage }))
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


    removeDepartment$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE_DEPARTMENT),
          switchMap((action) => 
           {
            return this.departmentService.remove(action.department)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      this.store.dispatch(START_DEPARTMENT({ page: action.page, limit: action.limit }))
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