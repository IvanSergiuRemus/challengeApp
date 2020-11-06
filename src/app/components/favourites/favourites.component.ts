import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactState } from '../../store/app.states'; 
import { EditContactAction, FavouriteContactAction } from 'src/app/store/actions/contact.actions';
declare var $: any;
declare var $: any;

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

    searchText2 = '';
    contactList$: Observable<Array<Contact>>;
  
    selectedContact: Contact = {
      id : '',
      name: '',
      email:'',
      phone: '',
      favourite: false
    }
   
    contactFormFav: FormGroup;
    contactFormEditFav: FormGroup;

    emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    constructor(private store: Store<ContactState>, private router: Router, private formBuilder: FormBuilder) { }
  
    ngOnInit(): void {
      
      this.contactFormFav = this.formBuilder.group({
        id: uuid(),
        name: this.formBuilder.control('', [Validators.required]),
        email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
        phone: this.formBuilder.control('',[Validators.required, Validators.pattern(this.phoneNumber), Validators.minLength(10), Validators.maxLength(10)]),
        favourite: false
  
      });
      
      this.contactFormEditFav = this.formBuilder.group({
        id: this.selectedContact.id,
        name: this.formBuilder.control('', [Validators.required]),
        email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
        phone: this.formBuilder.control('',[Validators.required, Validators.pattern(this.phoneNumber), Validators.minLength(10), Validators.maxLength(10)]),
        favourite: this.selectedContact.favourite
  
      });
      
      this.contactList$ = this.store.select(store => store.contact);
      
    }
   
    saveEditContact() {

      console.log(this.contactFormEditFav.getRawValue(), 'UPDATED FORM');
  
      setTimeout(() => {
        this.store.dispatch(new EditContactAction(this.contactFormEditFav.getRawValue()));
      },1500);
      $('#editContactModal').modal('hide')
    }
  
    getSelectedContact(contact : Contact){

      this.selectedContact = contact;
  
      this.contactFormEditFav.patchValue({
        id: this.selectedContact.id,
        name: this.selectedContact.name,
        email: this.selectedContact.email,
        phone: this.selectedContact.phone,
        favourite: this.selectedContact.favourite
      })
      
      console.log(this.selectedContact);
      
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
        this.store.dispatch(new FavouriteContactAction(updatedSpace));
      },1500)
    }
  }
  