import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import AppState from './state/app.state';
import { PASS_THE_TOKEN } from './state/actions/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

   title = 'Technicians Work';

   store = inject(Store<AppState>)

   ngOnInit(): void 
   {
      this.store.dispatch(PASS_THE_TOKEN())
   }



  
}
