import { Component } from '@angular/core';

@Component({
	templateUrl: 'providers.html'
})
export class ProvidersComponent {
	providers = [
		{
			label: 'Wiki',
			path: 'wiki'
		},
		{
			label: 'IMDB',
			path: 'imdb'
		}
	];
}
