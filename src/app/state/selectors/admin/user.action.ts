import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { PROFILE_STATE_NAME } from '../../constants/user';


const getUserProfile = createFeatureSelector<IUser>(PROFILE_STATE_NAME)

export const getProfile = createSelector(getUserProfile, state => {
    return state
})