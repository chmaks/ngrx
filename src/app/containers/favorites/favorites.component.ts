import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ImdbModel } from '@models/imdb/imdb.model';
import { WikiModel } from '@models/wiki/wiki.model';

import { selectedImdb } from '@store/selectors/imdb.selectors';
import { selectedWiki } from '@store/selectors/wiki.selectors';

import * as imdbActions from '@store/actions/imdb.actions';
import * as wikiActions from '@store/actions/wiki.actions';

import { imdbColumns } from './imdb.columns';
import { wikiColumns } from './wiki.columns';
import { Observable } from 'rxjs';

@Component({
	templateUrl: 'favorites.html',
	styleUrls: ['./favorites.scss']
})
export class FavoritesComponent implements OnInit {
	imdbColumns = imdbColumns;
	wikiColumns = wikiColumns;

	wikiItems$: Observable<WikiModel[] | null>;
	imdbItems$: Observable<ImdbModel[] | null>;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.wikiItems$ = this.store.pipe(select(selectedWiki));
		this.imdbItems$ = this.store.pipe(select(selectedImdb));
	}

	updateWiki(wiki: WikiModel) {
		this.store.dispatch(wikiActions.updateWiki({ wiki }));
	}

	updateImdb(imdb: ImdbModel) {
		this.store.dispatch(imdbActions.updateImdb({ imdb }));
	}
}
