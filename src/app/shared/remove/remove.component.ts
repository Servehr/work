import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { BotinComponent } from '../../components/controls/botin/botin.component';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { sleepWait } from '../../util/sleep';
import { getSpinnerStatus } from '../../state/selectors/spinner.selector';
import { REMOVE } from '../../state/actions/management/category.actions';

@Component({
  selector: 'app-remove',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.scss'
})
export class RemoveComponent {

  @Output() close: EventEmitter<void> = new EventEmitter()
  isLoading = signal<boolean>(false)
  data = input<any>()

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
    await sleepWait(1000)
    console.log(this.data())
    this.store.dispatch(REMOVE({ data: this.data() }))
  }

}
