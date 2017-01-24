import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html'
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact = <Contact>{ address: {}};

  constructor(private route: ActivatedRoute, private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
    let contactId = this.route.snapshot.params['id'];
    this.contactsService.getContact(contactId).subscribe(contact => this.contact = contact);
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact).subscribe(() => this.goToDetails());
  }

  cancel(contact: Contact) {
    this.goToDetails();
  }

  private goToDetails() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }


}
