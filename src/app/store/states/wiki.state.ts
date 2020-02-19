import { WikiModel } from '@models/wiki/wiki.model';

export interface WikiState {
	items: WikiModel[] | null;
	loading: boolean;
	total: number;
	error: string | null;
	selectedWiki: WikiModel[];
	selectedWikiIds: string[];
}

export const initialWikiState: WikiState = {
	items: null,
	loading: true,
	total: 0,
	error: null,
	selectedWiki: [],
	selectedWikiIds: []
};
