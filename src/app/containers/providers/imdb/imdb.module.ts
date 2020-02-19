import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from '@components/table/table.module';

import { routing } from './providers.routing';
import { ImdbComponent } from './imdb.component';

@NgModule({
	imports: [
		CommonModule, //

		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		MatButtonModule,
		MatIconModule,

		TableModule,
		routing
	],
	declarations: [ImdbComponent],
	exports: [ImdbComponent]
})
export class ImdbModule {}
