
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REXOURCE_STATE_NAME } from '../../../constants/management/rexource';


const getRexource = createFeatureSelector<any>(REXOURCE_STATE_NAME)

export const getAllRexource = createSelector(getRexource, state => 
{
    return state
})