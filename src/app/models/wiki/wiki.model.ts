export class WikiModel {
	timestamp: string;
	pageid: string;
	title: string;
	snippet: string;
	notes: string;
	wordcount: number;

	constructor(d: WikiModel) {
		if (!d) {
			return;
		}

		Object.assign(this, d);
	}
}
