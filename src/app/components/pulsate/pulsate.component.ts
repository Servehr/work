import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pulsate',
  standalone: true,
  imports: [],
  templateUrl: './pulsate.component.html',
  styleUrl: './pulsate.component.scss'
})
export class PulsateComponent {

    @Input() summaries:any = [{ 'text': '', 'nos': 0, updated: "" }]
    @Input() box:string = 'false'

}
