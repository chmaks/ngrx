import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { TableModule } from '@components/table/table.module';

import { routing } from './favorites.routing';

import { FavoritesComponent } from './favorites.component';

@NgModule({
	imports: [CommonModule, FormsModule, TableModule, routing],
	declarations: [FavoritesComponent],
	exports: [FavoritesComponent]
})
export class FavoritesModule {}
