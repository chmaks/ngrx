import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import * as imdbActions from './../actions/imdb.actions';

import { ImdbPageModel } from '@models/imdb/imdb-page.model';
import { ImdbRestService } from '@services/imdb/imdb.service';

@Injectable()
export class ImdbEffects {
	imdbList$ = createEffect(() =>
		this.actions$.pipe(
			ofType(imdbActions.loadImdb),
			mergeMap(({ queries }) =>
				this.imdbService.list(queries).pipe(
					map((page: ImdbPageModel) => {
						return imdbActions.loadImdbSuccess({ page });
					}),
					catchError(error => {
						return of(imdbActions.loadImdbFailure({ error }));
					})
				)
			)
		)
	);

	constructor(private imdbService: ImdbRestService, private actions$: Actions) {}
}
