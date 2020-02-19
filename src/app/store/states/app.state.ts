import { ImdbState, initialImdbState } from './imdb.state';
import { WikiState, initialWikiState } from './wiki.state';

export interface AppState {
	wiki: WikiState;
	imdb: ImdbState;
}

export const initialAppState: AppState = {
	wiki: initialWikiState,
	imdb: initialImdbState
};

export function getInitialState(): AppState {
	return initialAppState;
}
