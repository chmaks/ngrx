import { createReducer, on, Action } from '@ngrx/store';

import { ImdbModel } from '@models/imdb/imdb.model';

import * as imdbActions from './../actions/imdb.actions';

import { initialImdbState, ImdbState } from '../states/imdb.state';

const reducer = createReducer(
	initialImdbState,
	on(imdbActions.loadImdb, (state, { queries }) => ({
		...state,
		...queries,
		loading: true,
		error: null
	})),
	on(imdbActions.loadImdbSuccess, (state, { page }) => ({
		...state,
		items: page.items,
		total: page.total,
		loading: false,
		error: null
	})),
	on(imdbActions.loadImdbFailure, (state, { error }) => ({
		...state,
		loading: false,
		items: [],
		total: 0,
		error
	})),
	on(imdbActions.addImdb, (state, { imdb }) => ({
		...state,
		selectedImdb: [...state.selectedImdb, imdb],
		selectedImdbIds: [...state.selectedImdbIds, imdb.imdbID]
	})),
	on(imdbActions.removeImdb, (state, { imdbID }) => ({
		...state,
		selectedImdb: [...state.selectedImdb.filter((i: ImdbModel) => i.imdbID !== imdbID)],
		selectedImdbIds: [...state.selectedImdbIds.filter((i: string) => i !== imdbID)]
	})),
	on(imdbActions.updateImdb, (state, { imdb }) => {
		const inx = state.selectedImdb.findIndex((i: ImdbModel) => i.imdbID === imdb.imdbID);
		state.selectedImdb.splice(inx, 1, imdb);

		return {
			...state,
			selectedImdb: [...state.selectedImdb]
		};
	})
);

export function imdbReducers(state: ImdbState | undefined, action: Action) {
	return reducer(state, action);
}
