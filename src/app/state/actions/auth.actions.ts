import { createAction, props } from "@ngrx/store";
import { AUTH_FORGOT_FAILED, AUTH_FORGOT_START, AUTH_FORGOT_SUCCESS, AUTH_LOGIN_START, AUTH_LOGIN_SUCCESS, AUTH_REGISTER_START, AUTH_REGISTER_SUCCESS, AUTH_RESET_PASSWORD_FAILED, AUTH_RESET_PASSWORD_START, AUTH_RESET_PASSWORD_SUCCESS, FAILED_TOKEN, PASS_TOKEN, PASSED_TOKEN } from "../constants/auth";
import { AuthResponse } from "../response/AuthResponse";


// Login
export const START_LOGIN = createAction(AUTH_LOGIN_START, props<{email: string, password: string}>())
export const LOGIN_SUCCESS = createAction(AUTH_LOGIN_SUCCESS, props<{ auth: AuthResponse}>())

// Register
export interface IRegister 
{
   category: number
   firstname: string
   surname: string
   phone: string
   email: string
}

export const START_REGISTER = createAction(AUTH_REGISTER_START, props<{ firstname: string, surname: string, phone: string, email: string, category: string, password: string, cPassword: string, ninImage: string, passportImage: string }>())
export const REGISTER_SUCCESS = createAction(AUTH_REGISTER_SUCCESS, props<{ data: any }>())

// export const LOGOUT = createAction(FORGOT_LOGIN_START, props<{email: string}>())
// export const LOGOUT_SUCCESS = createAction(FORGOT_LOGIN_START, props<{email: string}>())
// export const LOGOUT_FAILED = createAction(FORGOT_LOGIN_START, props<{email: string}>())

export const PASS_THE_TOKEN = createAction(PASS_TOKEN)
export const TOKEN_IS_PASSED = createAction(PASSED_TOKEN, props<{ token: string }>())
export const TOKEN_FAILED = createAction(FAILED_TOKEN, props<{ msg: string | null }>())

// Forgot
export const START_FORGOT = createAction(AUTH_FORGOT_START, props<{ email: string }>())
export const FORGOT_SUCCESS = createAction(AUTH_FORGOT_SUCCESS)
export const FORGOT_FAILED = createAction(AUTH_FORGOT_FAILED, props<{ auth: AuthResponse} >)

// Forgot
export const START_RESET_PASSWORD = createAction(AUTH_RESET_PASSWORD_START, props<{ user: string, password: string, cPassword: string }>())
export const RESET_PASSWORD_SUCCESS = createAction(AUTH_RESET_PASSWORD_SUCCESS)
export const RESET_PASSWORD_FAILED = createAction(AUTH_RESET_PASSWORD_FAILED, props<{ auth: AuthResponse} >)