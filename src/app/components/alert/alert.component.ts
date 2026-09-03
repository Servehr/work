import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetClearErrorMessage } from '../../state/actions/spinner.action';
import AppState from '../../state/app.state';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

    @Input() statusCode!: number
    @Input() message!: string
    @Input() timeOut: number = 10000

    show: Boolean = true

    constructor(private store: Store<AppState>)
    {
      setTimeout(() => 
      {
         this.store.dispatch(SetClearErrorMessage({ msg: "", statusCode: 400, operation: "authenticate-user"  }))
      }, this.timeOut)
    }

}