import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ImdbState } from './../states/imdb.state';

export const selectImdbState = createFeatureSelector<ImdbState>('imdb');

export const selectedImdb = createSelector(selectImdbState, (state: ImdbState) => state.selectedImdb);

export const selectedImdbIds = createSelector(selectImdbState, (state: ImdbState) => state.selectedImdbIds);

export const selectAllImdb = createSelector(selectImdbState, (state: ImdbState) => state.items);

export const selectImdbError = createSelector(selectImdbState, (state: ImdbState) => state.error);

export const selectImdbLoading = createSelector(
	selectImdbState,
	(state: ImdbState): boolean => state.loading
);

export const selectImdbTotal = createSelector(selectImdbState, (state: ImdbState): number => state.total);
