import { WikiModel } from './wiki.model';

export class WikiPageModel {
	total: number;
	items: WikiModel[];

	constructor(d: WikiPageModel) {
		if (!d) {
			return;
		}

		Object.assign(this, d);
	}
}
