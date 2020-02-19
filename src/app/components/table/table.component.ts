import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	SimpleChanges,
	ViewChild,
	Output
} from '@angular/core';
import { Subscription, Subject, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumnsModel } from './columns.model';
import { ColumnTypeEnum } from './column.type.enum';

@Component({
	selector: 'app-table',
	templateUrl: 'table.html',
	styleUrls: ['./table.scss']
})
export class TableComponent<T> implements OnChanges, OnDestroy, AfterViewInit {
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	@Output() loadItems = new EventEmitter<any>();
	@Output() toggleItem = new EventEmitter<any>();
	@Output() updateItem = new EventEmitter<T>();

	@Input() columns: TableColumnsModel[] = [];
	@Input() itemsTotal: number;
	@Input() selectKey: string;
	@Input() pageSize = 5;
	@Input() error: string | null = 'No Records Found!';
	@Input() loading = false;
	@Input() innerItems = false;
	@Input() selectedIds$: Observable<string[]>;
	@Input() items: T[] = [];

	private sub = new Subscription();

	dataSource: MatTableDataSource<T>;
	displayedColumns: string[];
	noteSubject$ = new Subject<string>();
	columnTypeEnum = ColumnTypeEnum;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.items && this.items) {
			this.setDataSource();
		}
		if (changes.columns && this.columns) {
			this.displayedColumns = [...this.columns.map(c => c.key)];
		}
	}

	ngAfterViewInit() {
		const notes$ = this.noteSubject$
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap((item: any) => {
					this.updateItem.emit(item);
				})
			)
			.subscribe();
		const sort$ = this.sort.sortChange.pipe(tap(() => (this.paginator.pageIndex = 0)));

		this.sub.add(notes$);
		this.sub.add(
			merge(sort$, this.paginator.page)
				.pipe(tap(() => this.load()))
				.subscribe()
		);

		if (this.innerItems) {
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.itemsTotal = this.items.length;
		}
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	toggle(event: MatCheckboxChange, item: T) {
		this.toggleItem.emit({ event, item });
	}

	private setDataSource() {
		this.dataSource = new MatTableDataSource(this.items);

		if (this.innerItems) {
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.itemsTotal = this.items.length;
		}
	}

	private load() {
		this.loadItems.emit({
			page: this.paginator.page,
			pageSize: this.paginator.pageSize,
			sortDirection: this.sort.direction,
			sortKey: this.sort.active
		});
	}
}
