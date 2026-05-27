import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../state/app.state';
import { getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';
import { sleepWait } from '../../../../../util/sleep';
import { REMOVE_DEPARTMENT } from '../../../../../state/actions/management/department.actions';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';

@Component({
  selector: 'app-remove-department',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove-department.component.html',
  styleUrl: './remove-department.component.scss'
})
export class RemoveDepartmentComponent   {

  @Output() close: EventEmitter<void> = new EventEmitter()
  isLoading = signal<boolean>(false)
  removeData = input<any>()


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
    this.store.dispatch(REMOVE_DEPARTMENT({ department: this.removeData().department, page: this.removeData().currentPage, limit: this.removeData().perPage }))
  }
}
