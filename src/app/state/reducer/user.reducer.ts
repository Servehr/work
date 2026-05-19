import { Action, createReducer, on } from "@ngrx/store"
import { UserProfileInitialState } from "../initials/initial.user.state"
import { PROFILE_SUCCESS, SEARCH_SUCCESS, SERARCH_USER, START_PROFILE } from "../actions/user.actions"


const _userReducer = createReducer(UserProfileInitialState, 
   on(START_PROFILE, (state: any, action: any) => 
    {
        return {
            ...state,
            profile: action.profile
        }
    }
   ),
   on(PROFILE_SUCCESS, (state: any, action: any) => 
    {
        return {
            ...state,
            profile: action.user
        }  
    }
   ),
   on(SEARCH_SUCCESS, (state: any, action: any) => 
    {
        console.log(action.profile)
        console.log(action.profile?.length)
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