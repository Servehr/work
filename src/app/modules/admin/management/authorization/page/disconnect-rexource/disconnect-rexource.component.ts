import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { SetErrorMessage, SetLoadingStatus } from '../../../../../../state/actions/spinner.action';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';
import { LabelComponent } from '../../../../../../components/controls/label/label.component';

@Component({
  selector: 'app-disconnect-rexource',
  standalone: true,
  imports: [BotinComponent, LabelComponent],
  templateUrl: './disconnect-rexource.component.html',
  styleUrl: './disconnect-rexource.component.scss'
})
export class DisconnectRexourceComponent {

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
      
  write = async () => 
  {
    // this.store.dispatch(SetLoadingStatus({ loading: true }))
    // if(this.rexourceForm.valid)
    // {
    //   of(this.rexourceForm.value)
    //   .pipe(delay(1000))
    //   .subscribe(dept => 
    //    {
    //       const rexsourceName = dept['rexsourceName']!
    //       const rexourceDescription = dept['rexourceDescription']!      
    //       // this.store.dispatch(START_LOGIN({ rexsourceName, rexourceDescription }))
    //    }
    //   )
    // } else {
    //   this.rexourceForm.markAllAsTouched()
    //   this.store.dispatch(SetLoadingStatus({ loading: false }))
    //   this.message = "Attend to all fields"
    //   this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-rexource"  }))
    // }     
  }

}
