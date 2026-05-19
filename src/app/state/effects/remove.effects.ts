import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import AppState from "../app.state";
import { SetLoadingStatus } from "../actions/spinner.action";
import { REMOVE } from "../actions/management/category.actions";
import { RemoveService } from "../../service/remove.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class RemoveEffect {

    private actions$ = inject(Actions);
    private removeService = inject(RemoveService);
    private store = inject(Store<AppState>);
    private toastr = inject(ToastrService)

    currentUrl!: string;

    // constructor(private toastr: ToastrService){} 

    
    remove$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(REMOVE),
          switchMap((action) => 
           {
            return this.removeService.remove(action.path, action.model)
             .pipe(
                tap(
                  {
                    next: (data) => { 
                      this.toastr.success(data?.message)
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200  } }))
                      this.store.dispatch({ type: '[category creation] category posting' })
                      },
                    error: (err) => { 
                      this.toastr.error( err?.error?.message, 'Error deleting'),
                      this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 400  } }))
                    },
                    complete: () => {
                      // this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 200 } })) 
                    },
                  }
                )
              )
           }
        )
      )
    }, { dispatch: false })    

}