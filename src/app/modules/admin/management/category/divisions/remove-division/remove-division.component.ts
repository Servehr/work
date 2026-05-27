import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { sleepWait } from '../../../../../../util/sleep';
import { REMOVE_DIVISION } from '../../../../../../state/actions/management/division.actions.';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';

@Component({
  selector: 'app-remove-division',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove-division.component.html',
  styleUrl: './remove-division.component.scss'
})
export class RemoveDivisionComponent {

  @Output() close: EventEmitter<void> = new EventEmitter()
  isLoading = signal<boolean>(false)
  removeData = input<any>(null)
  category = input<string>('')



  constructor(private store: Store<AppState>)
  {
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
       this.isLoading.set(data?.loader?.loading)
       if(!data?.loader?.loading)
       {
         this.isLoading.set(data?.loader?.loading)
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

  remove = async () =>
  {
    this.isLoading.set(true)
    await sleepWait(500)
    this.store.dispatch(REMOVE_DIVISION({ category: this.category(), division: this.removeData().division, page: this.removeData().currentPage, limit: this.removeData().perPage }))
  }
}
