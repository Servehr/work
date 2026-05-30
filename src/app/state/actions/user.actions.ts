import { createAction, props } from "@ngrx/store";
import { FAST_RESPONSE_FORM, NEWSLETTERS, USER_PROFILE_START, USER_PROFILE_SUCCESS, USER_SEARCH_START, USER_SEARCH_SUCCESS } from "../constants/user";
import { UserResponse } from "../response/UserResponse";


export const START_PROFILE = createAction(USER_PROFILE_START, props<{user: string}>())

export const PROFILE_SUCCESS = createAction(USER_PROFILE_SUCCESS, props<{user: UserResponse}>())

export const SERARCH_USER = createAction(USER_SEARCH_START, props<{keyword: string}>())
export const SEARCH_SUCCESS = createAction(USER_SEARCH_SUCCESS, props<{profile: UserResponse}>())

export const SUBSCRIBE = createAction(NEWSLETTERS, props<{ email: string }>())

export const FastForm = createAction(FAST_RESPONSE_FORM, props<{ firstname: string, surname: string, phone: string, email: string, message: string }>())


