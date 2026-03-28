import { Action, createReducer, on } from "@ngrx/store"
import { UserProfileInitialState } from "../initials/initial.user.state"
import { START_PROFILE } from "../actions/user.actions"


const _userReducer = createReducer(UserProfileInitialState, 
    on(START_PROFILE, (state: any, action: any) => 
    {
        console.log(action)
        return {
            ...state,
            profile: action.profile
        }
    }
    )
)

export function userReducer(state: any, action: Action)
{
     return _userReducer(state, action)
}