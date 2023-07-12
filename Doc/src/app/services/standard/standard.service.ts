import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/classes/contact/contact';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handlers.service';

// const api = 'https://doctoro-api-production-b463.up.railway.app/api/';
const api = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class StandardService {
  addCont = api + 'contacts';

  constructor(
    private handler: ReqHandlerService
  ) {}

  postContact(data: Contact): Observable<Contact>{
    return this.handler.handlePOST<Contact>(this.addCont, data)
  }
}
