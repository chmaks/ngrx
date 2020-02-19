import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ofType, Actions, createEffect } from '@ngrx/effects';

import * as wikiActions from './../actions/wiki.actions';

import { WikiPageModel } from '@models/wiki/wiki-page.model';
import { WikiRestService } from '@services/wiki/wiki.service';

@Injectable()
export class WikiEffects {
	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(wikiActions.loadWiki),
			mergeMap(({ queries }) =>
				this.wikiService.list(queries).pipe(
					map((page: WikiPageModel) => wikiActions.loadWikiSuccess({ page })),
					catchError((error: string) => of(wikiActions.loadWikiFailure({ error })))
				)
			)
		)
	);

	constructor(private wikiService: WikiRestService, private actions$: Actions) {}
}
