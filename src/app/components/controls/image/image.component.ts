import { NgClass, NgStyle } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {

  height = input<any>(40)
  width = input<any>(40)
  
  // @Input()
  // alt: string = 'company-logo'
  
  // @Input()
  // imageStyle: any = {
  //      'border-radius' : '0%'
  // }
  
  // @Input()
  // src: string = '../../../../../Technicians Logo.png'

  // constructor(private router: Router){}

  // redirect = () => 
  // {
  //   this.router.navigate(['/'])
  // }

  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;

  // Layout toggles
  @Input() fullWidth: boolean = false;
  @Input() fullHeight: boolean = false;

  // Performance Optimization
  @Input() lazy: boolean = true;

  // Tailwind customization hooks
  @Input() objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' = 'cover';
  @Input() customClass: string = '';

  // Helper to map object-fit string to Tailwind utility classes
  get objectFitClass(): string {
    const maps = {
      'cover': 'object-cover',
      'contain': 'object-contain',
      'fill': 'object-fill',
      'none': 'object-none',
      'scale-down': 'object-scale-down'
    };
    return maps[this.objectFit] || 'object-cover';
  }

}