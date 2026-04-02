import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LabelComponent } from '../../components/controls/label/label.component';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { ImageComponent } from '../../components/controls/image/image.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-view-info',
  standalone: true,
  imports: [LabelComponent, ImageComponent, NgClass],
  templateUrl: './view-info.component.html',
  styleUrl: './view-info.component.scss'
})
export class ViewInfoComponent {

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
   
   title: string = 'User Information'
   @Input() buttonName: string = ''
   @Output() close: EventEmitter<void> = new EventEmitter()

}
