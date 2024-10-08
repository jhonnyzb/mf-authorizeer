import { Injectable } from '@angular/core';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
@Injectable({
  providedIn: 'root'
})
export class GtmDispatchEventsService  implements GtmDispatchEventsRepository {
  constructor() { }
  sendEvent(event: any): void {
    let customEvent = new CustomEvent('gtmEvent', {detail: event});
    document.dispatchEvent(customEvent);
  }
  
}