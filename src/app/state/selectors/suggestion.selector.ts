import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SUGGESTION_STATE_NAME } from '../constants/suggestion';
import { Suggestion } from '../models/suggestion.model';

const getSearchSuggestion = createFeatureSelector<Suggestion>(SUGGESTION_STATE_NAME)

export const getSearchSugesstionKeyword = createSelector(getSearchSuggestion, state => {
    return state
})