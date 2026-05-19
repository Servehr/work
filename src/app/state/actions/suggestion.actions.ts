import { createAction, props } from "@ngrx/store";
import { START_SUGGESTION_SEARCH, SUGGESTED_RESULT } from "../constants/suggestion";


// Login
export const START_SUGGESTION = createAction(START_SUGGESTION_SEARCH, props<{ url: string }>())

export const SUGGESTION_SUCCESS = createAction(SUGGESTED_RESULT, props<{results: any}>())
