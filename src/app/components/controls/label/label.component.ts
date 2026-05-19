import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {

   // style: string = 'rounded-lg'

   style: any = {
     'border-raidus' : '0%'
   }

   @Input()
   id: string = ""

}
