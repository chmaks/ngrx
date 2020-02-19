import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as imdbActions from '@store/actions/imdb.actions';

import { ImdbQueriesModel, ImdbModel } from '@models/imdb';

import {
	selectAllImdb,
	selectImdbTotal,
	selectImdbLoading,
	selectImdbError,
	selectedImdbIds
} from '@store/selectors/imdb.selectors';

import { imdbColumns } from './imdb.columns';

@Component({
	templateUrl: 'imdb.html',
	styleUrls: ['./imdb.scss']
})
export class ImdbComponent implements OnInit, AfterViewInit, OnDestroy {
	private sub = new Subscription();
	private pageIndex = 0;

	pageSize = 10;
	imdbColumns = imdbColumns;

	filterSubject = new Subject<string>();
	filter: string;
	search: string;

	loading$: Observable<boolean>;
	items$: Observable<ImdbModel[] | null>;
	itemsTotal$: Observable<number>;
	error$: Observable<any>;
	selectedIds$: Observable<string[]>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<any>,
		private snackBar: MatSnackBar
	) {}

	ngOnInit() {
		this.parseQueriesParams(this.route.snapshot.queryParamMap);

		this.selectedIds$ = this.store.pipe(select(selectedImdbIds));
		this.items$ = this.store.pipe(select(selectAllImdb));
		this.itemsTotal$ = this.store.pipe(select(selectImdbTotal));
		this.loading$ = this.store.pipe(select(selectImdbLoading));
		this.error$ = this.error$ = this.store.pipe(select(selectImdbError));
		this.loadImdb();
	}

	ngAfterViewInit() {
		const filter$ = this.filterSubject.pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap((value: string) => {
				this.filter = value;
			})
		);

		this.sub.add(filter$.pipe(tap(() => this.loadImdb())).subscribe());
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	toggleItem({ event, item }) {
		event.checked
			? this.store.dispatch(imdbActions.addImdb({ imdb: item }))
			: this.store.dispatch(imdbActions.removeImdb({ imdbID: item.imdbID }));
		const msg = event.checked ? 'Record added to the favorites' : 'Record removed from to the favorites';
		this.showMessage(msg);
	}

	loadItems(params: any) {
		this.pageIndex = params.pageIndex;
		this.pageSize = params.pageSize;

		this.loadImdb();
	}

	private loadImdb() {
		const queries: ImdbQueriesModel = {
			search: this.filter,
			page: this.pageIndex,
			pageSize: this.pageSize
		};
		this.store.dispatch(imdbActions.loadImdb({ queries }));
		this.router.navigate([], {
			queryParams: { ...queries },
			queryParamsHandling: 'merge'
		});
	}

	private showMessage(message: string) {
		return this.snackBar.open(message, '', {
			duration: 4000
		});
	}

	private parseQueriesParams(queryParamMap: ParamMap) {
		this.filter = queryParamMap.get('search') || '';
		this.search = queryParamMap.get('search') || '';

		this.pageIndex = parseInt(queryParamMap.get('page') || '0', 10);
		this.pageSize = parseInt(queryParamMap.get('pageSize') || '20', 10);
	}
}
