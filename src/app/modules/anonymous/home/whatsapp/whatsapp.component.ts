import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent {

  phoneNumber = signal<string>('+2348159907899')
  userMessage = signal<string>('')
  // whatsappLink = signal<string>(`https://wa.me/{this.phoneNumber}`)

  encodedMessage: string = encodeURIComponent(this.userMessage());
  whatsappLink: string = `https://whatsapp.com/{this.phoneNumber}&text=${this.encodedMessage}`;

  // Dynamic Link with Pre-filled text
  openDynamicChat() 
  {
     const textMessage = encodeURIComponent('I need to you help out');
    //  const url = `https://wa.me{this.phoneNumber}?text=${textMessage}`;
     window.open(this.whatsappLink, '_blank');
  }  


}
