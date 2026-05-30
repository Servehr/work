import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-rexource-pages',
  standalone: true,
  imports: [],
  templateUrl: './rexource-pages.component.html',
  styleUrl: './rexource-pages.component.scss'
})
export class RexourcePagesComponent {

    rexourcePages = input<any>([])

}
