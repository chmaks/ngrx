import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TableComponent } from './table.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		MatTableModule,
		MatFormFieldModule,
		MatInputModule,
		MatSortModule,
		MatCheckboxModule,
		MatPaginatorModule,
		MatProgressSpinnerModule
	],
	declarations: [TableComponent],
	exports: [TableComponent]
})
export class TableModule {}
