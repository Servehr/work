import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { PROFILE_STATE_NAME } from '../../constants/user';
import { UserResponse } from '../../response/UserResponse';


const getUserProfile = createFeatureSelector<any>(PROFILE_STATE_NAME)

export const getProfile = createSelector(getUserProfile, state => {
    return state
})