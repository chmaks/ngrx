import { Routes, RouterModule } from '@angular/router';

import { WikiComponent } from './wiki.component';

export const routes: Routes = [
	{
		path: '',
		component: WikiComponent
	}
];

export const routing = RouterModule.forChild(routes);
