import { Component } from '@angular/core';
import { WysiwygComponent } from '../../../../library/wysiwyg/wysiwyg.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [WysiwygComponent, BotinComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  sectionTitle: string = "Contact"
  disabled: boolean = false
  content: any = 'editor'
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '14px 20px 14px 20px'
  }

  ChangeOnButtonHoverIn()
  {
     this.style = {
     'background-color' : '#776005',
     'color': 'white',
     'padding': '14px 20px 14px 20px' 
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '14px 20px 14px 20px'  
    } 
  }

  register = () =>
  {
      
  }

}
