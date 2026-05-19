
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CATEGORY_STATE_NAME } from '../../../constants/management/category';


const getCategories = createFeatureSelector<any>(CATEGORY_STATE_NAME)

export const getAllCategory = createSelector(getCategories, state => {
    return state
})