import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ProvidersRoutingModule } from './providers.routing.module';
import { ProvidersComponent } from './providers.component';

@NgModule({
	imports: [
		CommonModule, //
		MatTabsModule,

		RouterModule,

		ProvidersRoutingModule
	],
	declarations: [ProvidersComponent],
	exports: [ProvidersComponent]
})
export class ProvidersModule {}
