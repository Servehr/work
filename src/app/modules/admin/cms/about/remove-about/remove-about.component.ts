import { Component, EventEmitter, input, output, Output, signal } from '@angular/core';
import { sleepWait } from '../../../../../util/sleep';
import AppState from '../../../../../state/app.state';
import { Store } from '@ngrx/store';
import { getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';
import { REMOVE_CATEGORY } from '../../../../../state/actions/management/category.actions';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';
import { REMOVE_ABOUT } from '../../../../../state/actions/cms/about.actions';

@Component({
  selector: 'app-remove-about',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove-about.component.html',
  styleUrl: './remove-about.component.scss'
})
export class RemoveAboutComponent  {

  @Output() close: EventEmitter<void> = new EventEmitter()
  isLoading = signal<boolean>(false)
  removeData = input<any>()
  closeRemoveWriteAbout = output<boolean>()


  constructor(private store: Store<AppState>)
  {
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      if(data?.loader?.page === 'delete-about-us')
      {
        this.isLoading.set(data?.loader?.loading)
        this.closeRemoveWriteAbout.emit(false)
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
    console.log(this.removeData())
    this.store.dispatch(REMOVE_ABOUT({ about: this.removeData() }))
  }

}

