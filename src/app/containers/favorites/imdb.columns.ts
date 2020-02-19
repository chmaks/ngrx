import { TableColumnsModel } from '@components/table/columns.model';
import { ColumnTypeEnum } from '@components/table/column.type.enum';

export const imdbColumns: TableColumnsModel[] = [
	{
		key: 'Poster',
		title: 'Poster',
		type: ColumnTypeEnum.img,
		sortKey: 'Poster'
	},
	{
		key: 'Title',
		title: 'Title',
		sortKey: 'Title'
	},
	{
		key: 'Year',
		title: 'Year',
		sortKey: 'Year'
	},
	{
		key: 'Type',
		title: 'Type',
		sortKey: 'Type'
	},
	{
		key: 'notes',
		title: 'Notes',
		type: ColumnTypeEnum.notes
	}
];
