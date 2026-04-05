import { Action, createReducer, on } from "@ngrx/store"
import { InitialState } from "../initials/initial.suggestion.state"
import { START_SUGGESTION, SUGGESTION_SUCCESS } from "../actions/suggestion.actions"

const _suggestionReducer = createReducer(InitialState,
     on(START_SUGGESTION, (state: any, action: any) => {
        console.log("+++++++++++++++++++")
        console.log(action.productName)
        console.log("+++++++++++++++++++")
        return {
            ...state,
            results: action
        }
     }),
     on(SUGGESTION_SUCCESS, (state: any, action: any) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@")
        console.log(action)
        console.log("@@@@@@@@@@@@@@@@@@@@@")
        return {
            ...state,
            results: action.results
        }
     })
    )



export function SuggestionReducer(state: any, action: Action) {
    return _suggestionReducer(state, action)
}