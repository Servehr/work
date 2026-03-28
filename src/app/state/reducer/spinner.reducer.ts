import { Action, createReducer, on } from "@ngrx/store";
import { InitialState } from "../initials/initial.spinner.state";
import { SetErrorMessage, SetLoadingStatus } from "../actions/spinner.action";


const _spinner = createReducer(InitialState,
    on(SetLoadingStatus, (state:any, action: any) => {
        return {
            ...state,
            loading: action.loading
        }
    })
)


export function spinReducer(state: any, action: Action)
{
    return _spinner(state, action)
}