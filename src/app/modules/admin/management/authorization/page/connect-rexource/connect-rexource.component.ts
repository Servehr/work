import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';
import { LabelComponent } from '../../../../../../components/controls/label/label.component';

@Component({
  selector: 'app-connect-rexource',
  standalone: true,
  imports: [BotinComponent, LabelComponent],
  templateUrl: './connect-rexource.component.html',
  styleUrl: './connect-rexource.component.scss'
})
export class ConnectRexourceComponent {

  private store = inject(Store<AppState>)
  
  @Input() title: string = ''
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter()
    
  pageTitle: string = ''
  isLoading: boolean = false
  message: string = ''
  statusCode!: number
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '20px'
  }

  @Input() options: { 'text': string, 'nos': number }[] = [
    { 'text': 'Staff', 'nos': 15 },
    { 'text': 'Managers', 'nos': 2 },
    { 'text': 'CSA', 'nos': 5 },
    { 'text': 'Riders Manager', 'nos': 4 },
    { 'text': 'Whare House Manager', 'nos': 3 },
    { 'text': 'Merchants', 'nos': 549 },
    { 'text': 'Riders', 'nos': 148 },
    { 'text': 'Accountant', 'nos': 1 }
  ]

  ngOnInit(): void 
  {
    this.store.select(getResponseMessage).subscribe((data) => 
    {
      const { statusCode, msg } = data.response
      this.message = msg
      this.statusCode = statusCode
    })
    this.store.select(getSpinnerStatus).subscribe((data: any) => {
      // this.isLoading = status
    })
  }
  
  ChangeOnButtonHoverIn()
  {
    this.style = {
      'background-color' : '#776005',
      'color': 'white',
      'padding': '20px'         
    }
  }
  
  ChangeOnButtonHoverOut()
  {
     this.style = {
        'background-color' : '#be9d18',
        'color': 'black',
        'padding': '20px'        
     } 
  }
  
  closeModal()
  {
    this.close.emit()
  }

  disconnect()
  {
    
  }

  write()
  {

  }

}
