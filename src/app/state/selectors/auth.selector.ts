import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth } from '../models/auth.model';
import { AUTH_STATE_NAME } from '../constants/auth';

const getAuthenticatedData = createFeatureSelector<Auth>(AUTH_STATE_NAME)

export const getAuthData = createSelector(getAuthenticatedData, state => {
    return state
})

export const isAuthenticated = createSelector(getAuthenticatedData, state => {
    return state ? state : null
})

export const getUserToken = createSelector(getAuthenticatedData, state => 
{
    return state?.auth?.token ? state?.auth?.token : null
})





// export const getUserToken = createSelector(getAuthenticatedData, state => {
//     return state?.auth?.token ? state?.auth.token : null
// })

