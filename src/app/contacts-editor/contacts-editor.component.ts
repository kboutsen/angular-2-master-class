import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactsService } from '../contacts.service';
import { EventBusService, APP_TITLE_CHANGE_EVENT_TYPE } from '../event-bus.service'
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html'
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact = <Contact>{ address: {}};

  constructor(private route: ActivatedRoute, private router: Router, private contactsService: ContactsService, private eventBusService: EventBusService) { }

  ngOnInit() {
    let contactId = this.route.snapshot.params['id'];
    this.contactsService.getContact(contactId).subscribe(contact => {
      this.contact = contact
      this.eventBusService.emit(APP_TITLE_CHANGE_EVENT_TYPE, `Editing: ${this.contact.name}`);
    });

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
