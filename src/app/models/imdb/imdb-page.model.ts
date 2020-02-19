import { ImdbModel } from './imdb.model';

export class ImdbPageModel {
	total: number;
	items: ImdbModel[];

	constructor(d: ImdbPageModel) {
		if (!d) {
			return;
		}

		Object.assign(this, d);
	}
}
