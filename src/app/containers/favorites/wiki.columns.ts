import { TableColumnsModel } from '@components/table/columns.model';
import { ColumnTypeEnum } from '@components/table/column.type.enum';

export const wikiColumns: TableColumnsModel[] = [
	{
		key: 'title',
		title: 'Title',
		sortKey: 'title'
	},
	{
		key: 'timestamp',
		title: 'Time',
		sortKey: 'timestamp',
		type: ColumnTypeEnum.date
	},
	{
		key: 'snippet',
		title: 'Snippet',
		type: ColumnTypeEnum.html
	},
	{
		key: 'notes',
		title: 'Notes',
		type: ColumnTypeEnum.notes,
		sortKey: 'notes'
	}
];
