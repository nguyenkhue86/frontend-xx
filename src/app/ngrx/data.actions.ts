import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {BackgroundData} from './data.model';


// Section 2
export const ADD_TUTORIAL       = '[BACKGROUNDDATA] Add';
export const REMOVE_TUTORIAL    = '[BACKGROUNDDATA] Remove';
export const DEFAULT    = '[BACKGROUNDDATA] default';

// Section 3
export class AddBackgroundData implements Action {
  readonly type = ADD_TUTORIAL;
  constructor(public payload: BackgroundData) {}
}

export class RemoveBackgroundData implements Action {
  readonly type = REMOVE_TUTORIAL;
  constructor() {}
}

export class Default implements Action {
  readonly type = DEFAULT;
  constructor() {}
}
// Section 4
export type Actions = AddBackgroundData | RemoveBackgroundData | Default;
