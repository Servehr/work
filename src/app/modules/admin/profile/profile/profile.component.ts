import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetLoadingStatus } from '../../../../state/actions/spinner.action';
import AppState from '../../../../state/app.state';
import { START_PROFILE } from '../../../../state/actions/user.actions';
import { Router } from '@angular/router';
import { getProfile } from '../../../../state/selectors/admin/user.action';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  PageTitle: string = 'Profile'
  message: string = ''
  statusCode!: number

  constructor(private store: Store<AppState>) 
  { 
    // this.store.select(getProfile).subscribe((data) => 
    //   {
    //      console.log(data)
    //     //  const { statusCode, msg } = data.response
    //     //  this.message = msg
    //     //  this.statusCode = statusCode
    //   }) 
    } 

  ngOnInit(): void 
  {
    const user: string = "69b42aa7e4551c3510a26a7f"
    this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
    this.store.dispatch(START_PROFILE({ user: user }))
  }




}
