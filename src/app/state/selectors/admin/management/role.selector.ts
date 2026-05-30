
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROLE_STATE_NAME } from '../../../constants/management/role';


const getRoles = createFeatureSelector<any>(ROLE_STATE_NAME)

export const getAllRole = createSelector(getRoles, state => 
{
    return state
})