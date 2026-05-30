import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';
import { sleepWait } from '../../../../../util/sleep';
import { REMOVE_ROLE } from '../../../../../state/actions/management/role.actions';
import { Store } from '@ngrx/store';
import AppState from '../../../../../state/app.state';
import { getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';

@Component({
  selector: 'app-remove-role',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove-role.component.html',
  styleUrl: './remove-role.component.scss'
})
export class RemoveRoleComponent {

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
  {console.log(this.removeData())
    this.isLoading.set(true)
    await sleepWait(1000)
    this.store.dispatch(REMOVE_ROLE({ role: this.removeData().role, page: this.removeData().currentPage, limit: this.removeData().perPage }))
  }
}
