
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DIVISION_STATE_NAME } from '../../../constants/management/division.';


const getDivisions = createFeatureSelector<any>(DIVISION_STATE_NAME)

export const getAllDivision = createSelector(getDivisions, state => 
{
    return state
})