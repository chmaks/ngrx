import { createSelector, createFeatureSelector } from '@ngrx/store';

import { WikiState } from './../states/wiki.state';

export const selectWikiState = createFeatureSelector<WikiState>('wiki');

export const selectedWiki = createSelector(selectWikiState, (state: WikiState) => state.selectedWiki);

export const selectedWikiIds = createSelector(selectWikiState, (state: WikiState) => state.selectedWikiIds);

export const selectAllWiki = createSelector(selectWikiState, (state: WikiState) => state.items);

export const selectWikiError = createSelector(selectWikiState, (state: WikiState) => state.error);

export const selectWikiLoading = createSelector(
	selectWikiState,
	(state: WikiState): boolean => state.loading
);

export const selectWikiTotal = createSelector(selectWikiState, (state: WikiState): number => state.total);
