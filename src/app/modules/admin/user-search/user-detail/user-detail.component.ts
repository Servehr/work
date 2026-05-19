import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { ImageComponent } from '../../../../components/controls/image/image.component';
import { NgClass } from '@angular/common';
import { LabelComponent } from '../../../../components/controls/label/label.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { bootstrapThreeDotsVertical } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ImageComponent, NgClass, LabelComponent, BotinComponent, NgIcon],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  pageTitle: string = 'Dawud Information'
  flyOutPanel: any = bootstrapThreeDotsVertical

  private store = inject(Store<AppState>)

  imageStyle: any = {
    'border-radius' : '20%'
  }

  @Input()
  height: number = 500

  @Input()
  width: number = 400
  
  @Input()
  alt: string = 'company-logo'
 
  @Input()
  src: string = '../../../../../man.jpg'
   
   title: string = 'User Information'
   @Input() buttonName: string = ''
   @Output() close: EventEmitter<void> = new EventEmitter()

   closeModal()
   {
    
   }    

}
