import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SelectComponent } from '../../components/controls/select/select.component';
import { BotinComponent } from '../../components/controls/botin/botin.component';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../state/selectors/spinner.selector';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MakeSelection } from '../../modules/auth/register/register.component';
import { ImageComponent } from '../../components/controls/image/image.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-take-action-on-staff',
  standalone: true,
  imports: [NgClass, SelectComponent, BotinComponent, ReactiveFormsModule, ImageComponent],
  templateUrl: './take-action-on-staff.component.html',
  styleUrl: './take-action-on-staff.component.scss'
})
export class TakeActionOnStaffComponent implements OnInit {

   private store = inject(Store<AppState>)

  imageStyle: any = {
    'border-radius' : '20%'
  }

  @Input()
  height: number = 400

  @Input()
  width: number = 400
  
  @Input()
  alt: string = 'company-logo'
 
  @Input()
  src: string = '../../../../../man.jpg'

   @Input() title: string = ''
   @Input() buttonName: string = ''
   @Output() close: EventEmitter<void> = new EventEmitter()
    
   actions:{ id: string, name: string }[] = 
   [
      { id: 'Human Resource', name:'Hr' },
      { id: 'Sales', name: 'Sales' },
      { id: 'Finance', name:'finance' },
      { id: 'agent', name:'agent' },
   ]
    
   pageTitle: string = ''
   writeStaff: boolean = false
   value: string = '-1'
   isLoading: boolean = false
   message: string = ''
   statusCode!: number
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }
  
   errorMessages = 
   { 
      selectionRequired: 'Select an action to perform'
   }
   
   actionForm: FormGroup

   constructor()
   {
      this.actionForm = new FormGroup(
        {
          actions: new FormControl('-1', [MakeSelection]),
        }
      ) 
      this.store.select(getResponseMessage).subscribe((data) => 
      {
        const { statusCode, msg } = data.response
         this.message = msg
         this.statusCode = statusCode
      })

   }   

   ngOnInit(): void 
   {
     this.store.select(getSpinnerStatus).subscribe((status: boolean) => {
       this.isLoading = status
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

    wrteCategory()
    {

    }

    write()
    {

    }

}
