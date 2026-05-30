
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PAGE_STATE_NAME } from '../../../constants/management/page';


const getPages = createFeatureSelector<any>(PAGE_STATE_NAME)

export const getAllPage = createSelector(getPages, state => 
{
    return state
})