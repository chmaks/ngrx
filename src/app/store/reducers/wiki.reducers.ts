import { createReducer, on, Action } from '@ngrx/store';

import { WikiModel } from '@models/wiki/wiki.model';

import * as wikiActions from './../actions/wiki.actions';

import { initialWikiState, WikiState } from '../states/wiki.state';

const reducer = createReducer(
	initialWikiState,
	on(wikiActions.loadWiki, (state, { queries }) => ({
		...state,
		...queries,
		loading: true,
		error: null
	})),
	on(wikiActions.loadWikiSuccess, (state, { page }) => ({
		...state,
		items: page.items,
		total: page.total,
		loading: false,
		error: null
	})),
	on(wikiActions.loadWikiFailure, (state, { error }) => ({
		...state,
		loading: false,
		items: [],
		total: 0,
		error
	})),
	on(wikiActions.addWiki, (state, { wiki }) => ({
		...state,
		selectedWiki: [...state.selectedWiki, wiki],
		selectedWikiIds: [...state.selectedWikiIds, wiki.pageid]
	})),
	on(wikiActions.removeWiki, (state, { pageid }) => ({
		...state,
		selectedWiki: [...state.selectedWiki.filter((i: WikiModel) => i.pageid !== pageid)],
		selectedWikiIds: [...state.selectedWikiIds.filter((i: string) => i !== pageid)]
	})),
	on(wikiActions.updateWiki, (state, { wiki }) => {
		const inx = state.selectedWiki.findIndex((i: WikiModel) => i.pageid === wiki.pageid);
		state.selectedWiki.splice(inx, 1, wiki);

		return {
			...state,
			selectedWiki: [...state.selectedWiki]
		};
	})
);

export function wikiReducers(state: WikiState | undefined, action: Action) {
	return reducer(state, action);
}
