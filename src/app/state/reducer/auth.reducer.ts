import { Action, createReducer, on } from "@ngrx/store"
import { AuthInitialState } from "../initials/initial.auth.state"
import { IAuthState } from "../initials/state/IAuthState"
import { LOGIN_SUCCESS, REGISTER_SUCCESS, TOKEN_IS_PASSED } from "../actions/auth.actions"

const _authReducer = createReducer(AuthInitialState,
   on(LOGIN_SUCCESS, (state: any, action: any) => {
     return {
       ...state,
       auth: action.auth
     }
   }),
   on(REGISTER_SUCCESS, (state: any, action: any) => {
     return {
       ...state,
       auth: action.data
     }
   }),
   on(TOKEN_IS_PASSED, (state: any, action: any) => {
     return {
       ...state,
       auth: { ...state, token: action?.token }
     }
   })
)


export function AuthReducer(state: any, action: Action) {
    return _authReducer(state, action)
}