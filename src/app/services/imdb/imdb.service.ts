import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ImdbQueriesModel, ImdbPageModel, ImdbModel } from '@models/imdb';

@Injectable()
export class ImdbRestService {
	private imdbUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com';

	constructor(private http: HttpClient) {}

	list(params: ImdbQueriesModel) {
		const url = this.getListUrl(params);

		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'Content-Type',
				'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
				'x-rapidapi-key': '22b186d2edmshc4f9d030391972fp144dcejsnaae46813a931'
			})
		};

		return this.http.get(url, options).pipe(
			switchMap((res: any) => {
				if (res.Response === 'True') {
					return of(
						new ImdbPageModel({
							items: (res.Search || []).map((i: ImdbModel) => new ImdbModel(i)),
							total: res.totalResults
						})
					);
				} else {
					return throwError(res.Error);
				}
			})
		);
	}

	private getListUrl(params: ImdbQueriesModel) {
		const obj = {
			page: params.page + 1,
			r: 'json',
			s: params.search
		};

		const stringParams = Object.entries(obj)
			.map(([key, val]) => `${key}=${encodeURIComponent(val as string)}`)
			.join('&');

		return `${this.imdbUrl}?${stringParams}`;
	}
}
