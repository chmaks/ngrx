import { ColumnTypeEnum } from './column.type.enum';

export interface TableColumnsModel {
	key: string;
	title: string;
	sortKey?: string;
	type?: ColumnTypeEnum; // enum
}
