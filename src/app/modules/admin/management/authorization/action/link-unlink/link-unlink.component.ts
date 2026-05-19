import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';

@Component({
  selector: 'app-link-unlink',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './link-unlink.component.html',
  styleUrl: './link-unlink.component.scss'
})
export class LinkUnlinkComponent {

  private store = inject(Store<AppState>)

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
      'color': 'white'       
    }
  }
  
  ChangeOnButtonHoverOut()
  {
    this.style = {
      'background-color' : '#be9d18',
      'color': 'black'      
    } 
  }

  remove()
  {

  }

  closeModal()
  {
     this.close.emit()
  }

}
