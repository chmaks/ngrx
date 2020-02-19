import { ImdbModel } from '@models/imdb/imdb.model';

export interface ImdbState {
	items: ImdbModel[] | null;
	loading: boolean;
	total: number;
	error: string | null;
	selectedImdb: ImdbModel[] | [];
	selectedImdbIds: string[] | [];
}

export const initialImdbState: ImdbState = {
	items: null,
	loading: true,
	total: 0,
	error: null,
	selectedImdb: [],
	selectedImdbIds: []
};
