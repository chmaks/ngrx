import { TableColumnsModel } from './columns.model';

export interface TableModel {
	columns: TableColumnsModel[];
	selectKey?: string;
	pageSize: number;
}
