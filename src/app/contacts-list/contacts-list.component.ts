import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { EventBusService, APP_TITLE_CHANGE_EVENT_TYPE } from '../event-bus.service'
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {
  private contacts: Observable<Array<Contact>>;
  private terms$ = new Subject<string>();

  constructor(private contactsService: ContactsService, private eventBusService: EventBusService) {}

  ngOnInit() {
    this.eventBusService.emit(APP_TITLE_CHANGE_EVENT_TYPE, 'Contacts');

    this.contacts = this.contactsService
                    .search(this.terms$)
                    .merge(this.contactsService.getContacts());
  }

  contactTrackBy(index, contact) {
    return contact.id;
  }
}
