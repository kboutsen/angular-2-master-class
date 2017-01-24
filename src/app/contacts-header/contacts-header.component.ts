import { Component, OnInit } from '@angular/core';
import { EventBusService, APP_TITLE_CHANGE_EVENT_TYPE } from '../event-bus.service'

@Component({
  selector: 'trm-contacts-header',
  templateUrl: './contacts-header.component.html'
})
export class ContactsHeaderComponent implements OnInit {
  title: string = 'Contacts'; 
  
  constructor(private eventBusService: EventBusService) {}

  ngOnInit() {
    this.eventBusService.observe(APP_TITLE_CHANGE_EVENT_TYPE)
                        .subscribe(title => this.title = title);
  }
  
}
