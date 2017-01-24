import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactsService } from '../contacts.service'
import { EventBusService, APP_TITLE_CHANGE_EVENT_TYPE } from '../event-bus.service'
import { Contact } from '../models/contact'

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html'
})
export class ContactsDetailViewComponent implements OnInit {
  private contact: Contact;
  constructor(private route: ActivatedRoute, private router: Router, private contactsService: ContactsService,
  private eventBusService: EventBusService) { }

  ngOnInit() {
    let contactId = this.route.snapshot.params['id'];
    this.contactsService.getContact(contactId).subscribe(contact => {
      this.contact = contact
      this.eventBusService.emit(APP_TITLE_CHANGE_EVENT_TYPE, this.contact.name);
    });
  }

  navigateToEditor (contact: Contact) {
    this.router.navigate(['edit'], {
      relativeTo: this.route
    });
  }

  navigateToList () {
    this.router.navigate(['/'], {
      relativeTo: this.route
    });
  }

}
