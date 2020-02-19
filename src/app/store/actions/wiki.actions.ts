import { createAction, props } from '@ngrx/store';

import { WikiQueriesModel, WikiPageModel, WikiModel } from '@models/wiki';

export const loadWiki = createAction('[WIKI] Load', props<{ queries: WikiQueriesModel }>());

export const addWiki = createAction('[WIKI] Add', props<{ wiki: WikiModel }>());

export const removeWiki = createAction('[WIKI] Remove', props<{ pageid: string }>());

export const updateWiki = createAction('[WIKI] Update', props<{ wiki: WikiModel }>());

export const loadWikiSuccess = createAction('[WIKI] Success', props<{ page: WikiPageModel }>());

export const loadWikiFailure = createAction('[WIKI] Failure', props<{ error: string }>());
