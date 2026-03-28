import { createAction, props } from "@ngrx/store";
import { USER_PROFILE_START, USER_PROFILE_SUCCESS } from "../constants/user";
import { UserResponse } from "../response/UserResponse";


// Login
export const START_PROFILE = createAction(USER_PROFILE_START, props<{user: string}>())

export const PROFILE_SUCCESS = createAction(USER_PROFILE_SUCCESS, props<{user: UserResponse}>())
