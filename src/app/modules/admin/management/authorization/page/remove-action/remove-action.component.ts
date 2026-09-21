import { Component, EventEmitter, input, Output, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { sleepWait } from '../../../../../../util/sleep';
import { REMOVE_AKTION } from '../../../../../../state/actions/management/aktion.actions';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';


@Component({
  selector: 'app-remove-action',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove-action.component.html',
  styleUrl: './remove-action.component.scss'
})
export class RemoveActionComponent {

  @Output() close: EventEmitter<void> = new EventEmitter()
  isLoading = signal<boolean>(false)
  toRemove = input<any>(null)
  theCurrentPage = input<string>('')
  data = input<any>()

  constructor(private store: Store<AppState>)
  {

  } 

  ngOnInit(): void 
  {
     this.store.select(getSpinnerStatus).subscribe((data: any) => 
     {
       if(data?.loader?.page === 'remove-action')
       {
         this.isLoading.set(false)
         this.close.emit()
       }
     })   
  }  
  
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '10px 20px 10px 20px' 
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
      'background-color' : '#776005',
      'color': 'white',
      'padding': '10px 20px 10px 20px'         
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '10px 20px 10px 20px'        
    } 
  }

  closeModal()
  {
     this.close.emit()     
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['toRemove'] && changes['theCurrentPage']['previousValue'] !== undefined || changes['toRemove']['firstChange'] === true)
    {      
      // this.isLoading.set(true)
      // this.removeActionData(this.toRemove()?._id)
    }
  }   

  removeActionData = async () =>
  {
    this.isLoading.set(true)
    await sleepWait(1000)
    this.store.dispatch(REMOVE_AKTION({ page: this.theCurrentPage(), action: this.toRemove()?._id }))
  }

}
