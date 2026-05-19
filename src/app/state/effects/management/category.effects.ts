import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import AppState from "../../app.state";
import { CategoryService } from "../../../service/management/category.service";
import { SetErrorMessage, SetLoadingStatus } from "../../actions/spinner.action";
import { CATEGORY_SUCCESS, CREATE_CATEGORY, CREATE_UPDATE, START_CATEGORY } from "../../actions/management/category.actions";
import { ToastrService } from "ngx-toastr";
import { CATEGORY_START } from "../../constants/management/category";


@Injectable({
    providedIn: 'root'
})

export class CategoryEffect {

    private actions$ = inject(Actions);
    private categoryService = inject(CategoryService);
    private store = inject(Store<AppState>);
    private router = inject(Router)

    constructor(private toastr: ToastrService){} 

    currentUrl!: string;
  
    category$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(START_CATEGORY),
          switchMap((action) => 
           {
            return this.categoryService.categories(action?.page, action?.limit)
             .pipe(
                map((data) => 
                {             
                  const transformed = data?.data?.data?.map((item: any) => ({
                    ...item,
                    divisions: { count: item?.divisions?.length, data: item?.divisions },
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
                  return CATEGORY_SUCCESS({ category: transformed });
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
        ofType(CATEGORY_SUCCESS),
          tap((action) => {
            this.router.navigate([window.location.pathname])
          })
        )
    }, { dispatch: false }) 
  

    newCategory$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_CATEGORY),
          switchMap((action) => 
           {
            return this.categoryService.create(action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_CATEGORY({ page: action.page, limit: action.perPage }))
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
    })
  

    upateCategory$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CREATE_UPDATE),
          switchMap((action) => 
           {
            return this.categoryService.update(action.category, action.name, action.description)
             .pipe(
                tap(
                  {
                    next: (data) => 
                    { 
                      this.toastr.success(data?.message),                      
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                      this.store.dispatch(START_CATEGORY({ page: action.page, limit: action.perPage }))
                      // this.store.dispatch({ type: '[retrieve categories] category posting' })
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

}