import { createAction, props } from "@ngrx/store";
import { UserResponse } from "../response/UserResponse";
import { JOB_START, JOB_CREATION_SUCCESS, CATEGORY_SEARCH_START, CATERGORY_SEARCH_SUCCESS } from "../constants/jobs";


export const START_JOB = createAction(JOB_START, props<{user: string}>())
export const JOB_SUCCESS = createAction(JOB_CREATION_SUCCESS, props<{user: string}>())

export const RETRIEVE_CATEGORY = createAction(CATEGORY_SEARCH_START)
export const CATEGORY_SUCCESS = createAction(CATERGORY_SEARCH_SUCCESS, props<{user: UserResponse}>())