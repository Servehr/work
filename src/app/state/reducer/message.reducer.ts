import { Action, createReducer, on } from "@ngrx/store";
import { SetClearErrorMessage, SetErrorMessage } from "../actions/spinner.action";
import { InitialState } from "../initials/initial.msg.state";


const _message = createReducer(InitialState,    
    on(SetErrorMessage, (state:any, action: any) => {
        return {
            ...state,
            response: action
        }
    }),
    on(SetClearErrorMessage, (state:any, action: any) => {
        return {
            ...state,
            response: action
        }
    })
)


export function MessageReducer(state: any, action: Action)
{
    return _message(state, action)
}