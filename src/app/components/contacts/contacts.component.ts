import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactState } from '../../store/app.states'; 
import { AddContactAction, DeleteContactAction, EditContactAction, FavouriteContactAction } from 'src/app/store/actions/contact.actions';

declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  searchText = '';

  contactList$: Observable<Array<Contact>>;

  selectedContact: Contact = {
    id : '',
    name: '',
    email:'',
    phone: '',
    favourite: false
  }

  contactForm: FormGroup;
  contactFormEdit: FormGroup;

  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  constructor(private store: Store<ContactState>, private router: Router, private formBuilder: FormBuilder) { 
    this.contactList$ = this.store.select(store => store.contact);

  }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      id: uuid(),
      name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      phone: this.formBuilder.control('',[Validators.required, Validators.pattern(this.phoneNumber), Validators.minLength(10), Validators.maxLength(10)]),
      favourite: false

    });
    
    this.contactFormEdit = this.formBuilder.group({
      id: this.selectedContact.id,
      name: this.formBuilder.control('',[Validators.required]),
      email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      phone: this.formBuilder.control('',[Validators.required, Validators.pattern(this.phoneNumber), Validators.minLength(10),Validators.maxLength(10)]),
      favourite: this.selectedContact.favourite

    });
    
    this.contactList$ = this.store.select(store => store.contact);
    
  }

  addContact() {
    setTimeout(() => {
      this.store.dispatch(new AddContactAction(this.contactForm.getRawValue()));
      
      
    },1500);

    $('#addContactModal').modal('hide')
  }

  saveEditContact() {

    console.log(this.contactFormEdit.getRawValue(), 'UPDATED FORM');

    setTimeout(() => {
      this.store.dispatch(new EditContactAction(this.contactFormEdit.getRawValue()));
    },1500);
    $('#editContactModal').modal('hide')
  }

  deleteContact(id: string) {
    setTimeout(() => {
      this.store.dispatch(new DeleteContactAction(id));
    }, 1500)
    $('#deleteContactModal').modal('hide')
  }

  addFavourite(contact : Contact){

    this.selectedContact = contact;
    console.log(this.selectedContact, 'SELECTED');

    const updatedSpace: Contact = { 
      id : this.selectedContact.id,
      name: this.selectedContact.name,
      email: this.selectedContact.email,
      phone: this.selectedContact.phone,
      favourite: !this.selectedContact.favourite 
    }
    console.log(updatedSpace, 'UPDATED SPACE')
    
    setTimeout(() => {
      this.store.dispatch(new FavouriteContactAction(updatedSpace))
    }, 1500)

  }

  getSelectedContact(contact : Contact){

    this.selectedContact = contact;

    this.contactFormEdit.patchValue({
      id: this.selectedContact.id,
      name: this.selectedContact.name,
      email: this.selectedContact.email,
      phone: this.selectedContact.phone,
      favourite: this.selectedContact.favourite
    })
    
    console.log(this.selectedContact);
    
  }

}
