import { TableColumnsModel } from '@components/table/columns.model';
import { ColumnTypeEnum } from '@components/table/column.type.enum';

export const wikiColumns: TableColumnsModel[] = [
	{
		key: 'selector',
		title: '',
		type: ColumnTypeEnum.selection
	},
	{
		key: 'title',
		title: 'Title'
	},
	{
		key: 'timestamp',
		title: 'Time',
		sortKey: 'create_timestamp',
		type: ColumnTypeEnum.date
	},
	{
		key: 'snippet',
		title: 'Snippet',
		type: ColumnTypeEnum.html
	}
];
