export class ImdbModel {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	notes: string;

	Poster: string;

	constructor(d: ImdbModel) {
		if (!d) {
			return;
		}

		Object.assign(this, d);
	}
}
