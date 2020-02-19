import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { WikiRestService } from '@services/wiki/wiki.service';
import { ImdbRestService } from '@services/imdb/imdb.service';

import { appReducers } from '@store/reducers/app.reducers';
import { WikiEffects } from '@store/effects/wiki.effects';
import { ImdbEffects } from '@store/effects/imdb.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderModule } from './layout/header/header.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule, //
		AppRoutingModule,
		HttpClientModule,

		HeaderModule,

		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([WikiEffects, ImdbEffects]),
		BrowserAnimationsModule
	],
	providers: [WikiRestService, ImdbRestService],
	bootstrap: [AppComponent]
})
export class AppModule {}
