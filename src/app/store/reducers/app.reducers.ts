import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../states/app.state';

import { wikiReducers } from './wiki.reducers';
import { imdbReducers } from './imdb.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
	wiki: wikiReducers,
	imdb: imdbReducers
};
