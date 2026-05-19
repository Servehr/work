export const AUTH_STATE_NAME = 'authState'
export const TOKEN_NAME = 'tokenState'

export const AUTH_LOGIN_START = '[login page] attempting to login'
export const AUTH_LOGIN_SUCCESS = '[login page] successfully authenticated'
export const AUTH_LOGIN_FAILED = '[login page] authorization failed'


export const AUTH_REGISTER_START = '[register page] attempting to register'
export const AUTH_REGISTER_SUCCESS = '[register page] successfully registered'
export const AUTH_REGISTER_FAILED = '[register page] authorization failed'


export const AUTH_FORGOT_START = '[forgot page] attempting to forgot'
export const AUTH_FORGOT_SUCCESS = '[forgot page] successfully registered'
export const AUTH_FORGOT_FAILED = '[forgot page] request failed'


export const AUTH_RESET_PASSWORD_START = '[reset password page] setting new password'
export const AUTH_RESET_PASSWORD_SUCCESS = '[reset password page] successfully set new password'
export const AUTH_RESET_PASSWORD_FAILED = '[reset password page] setting password failed'

export const PASS_TOKEN = '[pass token] get user token across'
export const PASSED_TOKEN = '[passed token] token passed to other component'
export const FAILED_TOKEN = '[failed token] token failed passing'


export const LOGOUT = '[logout use] end user session'
export const LOGOUT_SUCCESS = '[logout success] user no longer in session'
export const LOGOUT_FAILED = '[logout failed] logging out user failed'