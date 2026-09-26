
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AKTION_STATE_NAME } from '../../../constants/management/aktion';


const getAktions = createFeatureSelector<any>(AKTION_STATE_NAME)

export const getAllAktions = createSelector(getAktions, state => 
{
   return state?.aktions
})