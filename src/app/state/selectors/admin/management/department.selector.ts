
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DEPARTMENT_STATE_NAME } from '../../../constants/management/department';


const getDepartments = createFeatureSelector<any>(DEPARTMENT_STATE_NAME)

export const getAllDepartment = createSelector(getDepartments, state => 
{
    return state
})