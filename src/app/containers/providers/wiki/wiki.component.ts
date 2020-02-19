import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { MatSnackBar } from '@angular/material/snack-bar';

import { WikiModel, WikiQueriesModel } from '@models/wiki';

import * as wikiActions from '@store/actions/wiki.actions';

import {
	selectAllWiki,
	selectWikiTotal,
	selectedWikiIds,
	selectWikiLoading,
	selectWikiError
} from '@store/selectors/wiki.selectors';

import { wikiColumns } from './wiki.columns';

@Component({
	templateUrl: 'wiki.html'
})
export class WikiComponent implements OnInit, AfterViewInit, OnDestroy {
	private sub = new Subscription();
	private pageIndex: number;
	private sortDirection: string | null;
	private sortKey: string | null;

	filter: string;
	search: string;

	wikiColumns = wikiColumns;
	pageSize: number;

	filterSubject = new Subject<string>();

	loading$: Observable<boolean>;
	items$: Observable<WikiModel[] | null>;
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

		this.selectedIds$ = this.store.pipe(select(selectedWikiIds));
		this.items$ = this.store.pipe(select(selectAllWiki));
		this.itemsTotal$ = this.store.pipe(select(selectWikiTotal));
		this.loading$ = this.store.pipe(select(selectWikiLoading));
		this.error$ = this.store.pipe(select(selectWikiError));

		this.loadWiki();
	}

	ngAfterViewInit() {
		const filter$ = this.filterSubject.pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap((value: string) => {
				this.filter = value;
			})
		);

		filter$.pipe(tap(() => this.loadWiki())).subscribe();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	toggleItem({ event, item }) {
		event.checked
			? this.store.dispatch(wikiActions.addWiki({ wiki: item }))
			: this.store.dispatch(wikiActions.removeWiki({ pageid: item.pageid }));

		const msg = event.checked ? 'Record added to the favorites' : 'Record removed from to the favorites';
		this.showMessage(msg);
	}

	loadItems(params: any) {
		this.pageIndex = params.pageIndex;
		this.pageSize = params.pageSize;
		this.sortDirection = params.sortDirection;
		this.sortKey = params.sortKey;

		this.loadWiki();
	}

	private loadWiki() {
		const queries: WikiQueriesModel = {
			search: this.filter,
			page: this.pageIndex,
			pageSize: this.pageSize,
			direction: this.sortDirection,
			sortKey: this.sortKey
		};

		this.store.dispatch(wikiActions.loadWiki({ queries }));
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
		this.search = queryParamMap.get('search') || '';
		this.filter = queryParamMap.get('search') || '';
		this.pageIndex = parseInt(queryParamMap.get('page') || '0', 10);
		this.sortDirection = queryParamMap.get('direction');
		this.sortKey = queryParamMap.get('sortKey');

		this.sortKey = queryParamMap.get('sortKey');
		this.pageSize = parseInt(queryParamMap.get('pageSize') || '20', 10);
	}
}
