import { Action } from '@ngrx/store';
import { Contact } from '../../models/contact';

export enum ContactActionTypes {
    ADD_CONTACT = '[CONTACT] Add Contact',
    DELETE_CONTACT = '[CONTACT] Delete Contact',
    EDIT_CONTACT = '[CONTACT] EDIT Success',
    ADD_FAVOURITE = '[ADD FAVOURITE] ADD SUCCESS'
}


export class AddContactAction implements Action {
    readonly type = ContactActionTypes.ADD_CONTACT;

    constructor(public payload : Contact) { }
}

export class DeleteContactAction implements Action {
    readonly type = ContactActionTypes.DELETE_CONTACT;

    constructor(public payload : string) { }
}

export class EditContactAction implements Action {
    readonly type = ContactActionTypes.EDIT_CONTACT;

    constructor(public payload : Contact) { }
};

export class FavouriteContactAction implements Action {
    readonly type = ContactActionTypes.ADD_FAVOURITE;

    constructor(public payload : Contact) { }
};




export type ContactAction = AddContactAction | DeleteContactAction | EditContactAction | FavouriteContactAction ;
