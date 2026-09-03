
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ABOUT_STATE_NAME } from '../../../constants/cms/about';


const getAbout = createFeatureSelector<any>(ABOUT_STATE_NAME)

export const getAboutUs = createSelector(getAbout, state => 
{console.log(state)
    return state
})