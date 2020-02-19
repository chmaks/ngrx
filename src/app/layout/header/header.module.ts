import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from './header.component';

@NgModule({
	imports: [
		CommonModule, //
		RouterModule,

		MatToolbarModule,
		MatButtonModule,
		MatListModule
	],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})
export class HeaderModule {}
