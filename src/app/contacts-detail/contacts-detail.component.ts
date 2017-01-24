import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    let contactId = this.route.snapshot.params['id'];
    this.contactsService.getContact(contactId).subscribe(contact => this.contact = contact);
  }

}
