import { Component, input, output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-division',
  standalone: true,
  imports: [],
  templateUrl: './division.component.html',
  styleUrl: './division.component.scss'
})
export class DivisionComponent {

  PageTitle: string = 'Divisions'
  buttonName = input<string>('')
  divisions = input<any>([])

  ngOnChanges(changes: SimpleChanges)
  {
    // console.log(changes['division'])
  }

}
