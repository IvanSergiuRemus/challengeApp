import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducers';
import { Contact } from '../models/contact';
import * as cont from '../store/reducers/contact.reducer';

export interface ContactState {
  contact: Array<Contact>;
};

export interface AppState {
  authState: auth.State;
};

export const reducers = {
  auth: auth.reducer,
  cont : cont.ContactReducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectContactState = createFeatureSelector<ContactState>('contact');