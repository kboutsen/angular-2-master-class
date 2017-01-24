import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';
import { APP_CONFIG_TOKEN } from './app.config';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/merge'

@Injectable()
export class ContactsService {

  constructor(private http: Http, @Inject(APP_CONFIG_TOKEN) private appConfig) { }

  getContacts(): Observable<Array<Contact>> {
    return this.http.get(`${this.appConfig.apiEndpoint}/contacts`)
    .map(respone => respone.json())
    .map(data => data.items);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get(`${this.appConfig.apiEndpoint}/contacts/${id}`)
      .map(respone => respone.json())
      .map(data => data.item);
  }

  updateContact(contact: Contact) {
    return this.http.put(`${this.appConfig.apiEndpoint}/contacts/${contact.id}`, contact)
  }

  search(terms: Observable<string>, debounceTime = 400) : Observable<Array<Contact>> {
    return terms.debounceTime(debounceTime)
                .distinctUntilChanged()
                .switchMap(term => this.rawSearch(term));
  }

  private rawSearch(term: string): Observable<Array<Contact>> {
    return this.http.get(`${this.appConfig.apiEndpoint}/search?text=${term}`)
      .map(respone => respone.json())
      .map(data => data.items);
  }
}
