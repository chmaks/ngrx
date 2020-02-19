import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'favorites',
		pathMatch: 'full'
	},
	{
		path: 'favorites',
		loadChildren: () => import('./containers/favorites/favorites.module').then(m => m.FavoritesModule)
	},
	{
		path: 'providers',
		loadChildren: () => import('./containers/providers/providers.module').then(m => m.ProvidersModule)
	},
	{
		path: '**',
		redirectTo: 'favorites'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
