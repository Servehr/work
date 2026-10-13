import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-slides',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './virtual-slides.component.html',
  styleUrl: './virtual-slides.component.scss'
})
export class VirtualSlidesComponent implements OnInit {

  // Generate an array of 1,000 mock items to demonstrate virtual sliding
  virtualSlides: string[] = [];

  ngOnInit(): void 
  {
    this.virtualSlides = Array.from({ length: 1000 }).map((_, i) => `Slide #${i + 1}`);
  }

}
