import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {

  @Input()
  height: number = 0

  @Input()
  width: number = 0
  
  @Input()
  alt: string = 'company-logo'
  
  @Input()
  imageStyle: any = {
       'border-radius' : '0%'
  }
  
  @Input()
  src: string = '../../../../../Technicians Logo.png'

  constructor(private router: Router){}

  redirect = () => 
  {
    this.router.navigate(['/'])
  }

}