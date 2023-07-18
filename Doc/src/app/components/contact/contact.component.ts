import { Component } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Contact } from 'src/app/classes/contact/contact';
import { MyErrorStateMatcher } from 'src/app/services/matcher/matcher.service';
import { StandardService } from 'src/app/services/standard/standard.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  values = '';
  noInput: boolean = true;
  matcher = new MyErrorStateMatcher();
  value = '';
  nameInput = false;
  show = false;
  

  constructor(
    private standard: StandardService,
  ){}

  ngOnInit(){
    const contact = document.getElementById("contact");
    const nav = document.getElementById("nav");
    contact.style.backgroundColor = 'whitesmoke';
    nav.style.backgroundColor = 'whitesmoke';
  }

  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }
  nameKey(event: any){
    this.value = event.target.value;
    if(this.value){
      this.nameInput = true;
    }
  }
  contact(data: Contact){
    Notiflix.Loading.pulse('sending message...')
    this.standard.postContact(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.noInput = true;
        this.reset();
        Notiflix.Report.success(
          'Message Sent!',
          "Your message was successfully delivered to Dr. Owiti. Please check your email for a confirmation.",
          'Okay',
        )
      }
    })
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('contactForm'));
    setTimeout(() => {
      form.reset();
    }, 250)
  }
}
