import { TableColumnsModel } from '@components/table/columns.model';
import { ColumnTypeEnum } from '@components/table/column.type.enum';

export const imdbColumns: TableColumnsModel[] = [
	{
		key: 'selector',
		title: '',
		type: ColumnTypeEnum.selection
	},
	{
		key: 'Poster',
		title: 'Poster',
		type: ColumnTypeEnum.img
	},
	{
		key: 'Title',
		title: 'Title'
	},
	{
		key: 'Year',
		title: 'Year'
	},
	{
		key: 'Type',
		title: 'Type'
	}
];
