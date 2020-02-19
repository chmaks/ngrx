import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

import { WikiQueriesModel, WikiPageModel } from '@models/wiki';

@Injectable()
export class WikiRestService {
	private wikiUrl = 'https://en.wikipedia.org/w/api.php';

	constructor(private http: HttpClient) {}

	list(params: WikiQueriesModel) {
		const url = this.getListUrl(params);

		return this.http.get(url).pipe(
			switchMap((res: any) => {
				if (res.query) {
					return of(
						new WikiPageModel({
							items: res.query ? res.query.search : [],
							total: res.query ? res.query.searchinfo.totalhits : 0
						})
					);
				} else {
					return throwError(res.error.info);
				}
			})
		);
	}

	private getListUrl(params: WikiQueriesModel) {
		const obj = {
			action: 'query',
			format: 'json',
			origin: '*',
			list: 'search',
			srsort: params.sortKey && params.direction ? `${params.sortKey}_${params.direction}` : 'relevance',
			sroffset: params.page ? params.page * params.pageSize + 1 : 0,
			srsearch: params.search,
			srlimit: params.pageSize
		};

		const stringParams = Object.entries(obj)
			.map(([key, val]) => `${key}=${encodeURIComponent(val as string)}`)
			.join('&');

		return `${this.wikiUrl}?${stringParams}`;
	}
}
