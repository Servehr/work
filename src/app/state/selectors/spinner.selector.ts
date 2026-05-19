import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Spinner } from '../models/spinner.model';
import { Msg } from '../models/msg';
import { MESSAGE_NAME_STATE, SPINNER_STATE_NAME } from '../constants/spinner';

const getIsSpinnerLoading = createFeatureSelector<Spinner>(SPINNER_STATE_NAME)
export const getSpinnerStatus = createSelector(getIsSpinnerLoading, state => 
{
    return state
})

const getResponse = createFeatureSelector<Msg>(MESSAGE_NAME_STATE)
export const getResponseMessage = createSelector(getResponse, state => {
    return state
})

const getAddUserResponse = createFeatureSelector<Msg>(MESSAGE_NAME_STATE)
export const getAddedUserResponse = createSelector(getAddUserResponse, state => {
    return state
})