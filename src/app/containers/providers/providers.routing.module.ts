import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersComponent } from './providers.component';

export const routes: Routes = [
	{
		path: '',
		component: ProvidersComponent,
		children: [
			{
				path: '',
				redirectTo: 'wiki'
			},
			{
				path: 'wiki',
				loadChildren: () => import('./wiki/wiki.module').then(m => m.WikiModule)
			},
			{
				path: 'imdb',
				loadChildren: () => import('./imdb/imdb.module').then(m => m.ImdbModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProvidersRoutingModule {}
