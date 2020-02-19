import { createAction, props } from '@ngrx/store';

import { ImdbModel, ImdbPageModel, ImdbQueriesModel } from '@models/imdb';

export const loadImdb = createAction('[IMDB] Load', props<{ queries: ImdbQueriesModel }>());

export const addImdb = createAction('[IMDB] Add', props<{ imdb: ImdbModel }>());

export const removeImdb = createAction('[IMDB] Remove', props<{ imdbID: string }>());

export const updateImdb = createAction('[IMDB] Update', props<{ imdb: ImdbModel }>());

export const loadImdbSuccess = createAction('[IMDB] Success', props<{ page: ImdbPageModel }>());

export const loadImdbFailure = createAction('[IMDB] Failure', props<{ error: string }>());
