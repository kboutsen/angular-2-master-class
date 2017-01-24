import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subject } from 'rxjs/Subject'

import 'rxjs/add/operator/filter'

export const APP_TITLE_CHANGE_EVENT_TYPE = 'appTitleChange';

@Injectable()
export class EventBusService {
  private messages$ = new Subject<EventBusArgs>();

  constructor() { }

  emit(eventType: string, data: any) {
        this.messages$.next({ type: eventType, data: data });
  }

  observe(eventType: string): Observable<any> {
    return this.messages$
               .filter(args => args.type === eventType)
               .map(args => args.data);
  }
}

interface EventBusArgs {
    type: string;
    data: any;
}