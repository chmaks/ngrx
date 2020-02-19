import { Routes, RouterModule } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		component: FavoritesComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
