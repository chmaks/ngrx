import { Routes, RouterModule } from '@angular/router';

import { ImdbComponent } from './imdb.component';

export const routes: Routes = [
	{
		path: '',
		component: ImdbComponent
	}
];

export const routing = RouterModule.forChild(routes);
