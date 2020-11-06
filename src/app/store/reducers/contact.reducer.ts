import { createFeatureSelector } from '@ngrx/store'
import { Contact } from '../../models/contact';
import { ContactAction, ContactActionTypes } from '../actions/contact.actions';

const initialState: Array<Contact> = [
    {
      id: '1',
      name: 'Sarah Connor',
      email: 'sarah.connor@gmail.com',
      phone: '0749637281',
      favourite: false
    },
    {
      id: '2',
      name: 'Mike James',
      email: 'mike.james@gmail.com',
      phone: '0752932875',
      favourite: false
  }
];

export function ContactReducer(state: Array<Contact> = initialState, action: ContactAction) {

    switch(action.type){
        case ContactActionTypes.ADD_CONTACT:
            return [...state, action.payload];
        case ContactActionTypes.DELETE_CONTACT:
            return state.filter(contact => contact.id !== action.payload)
        case ContactActionTypes.EDIT_CONTACT:
          let index = state.map(contact => contact.id)
                        .indexOf(action.payload.id);
            return [
              ...state.slice(0, index),
              Object.assign({}, state[index], action.payload),
              ...state.slice(index + 1)
            ]
        case ContactActionTypes.ADD_FAVOURITE:
          let favIndex = state.map(contact => contact.id)
                        .indexOf(action.payload.id);
            return [
              ...state.slice(0, favIndex),
              Object.assign({}, state[favIndex], action.payload),
              ...state.slice(favIndex + 1)
            ]

        default:
            return state;
    }
}
export interface ContactState {
  contact: Array<Contact>;
};
export const selectContactState = createFeatureSelector<ContactState>('contact');