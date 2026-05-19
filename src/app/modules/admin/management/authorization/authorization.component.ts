import { NgClass } from '@angular/common';
import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RexourceComponent } from './rexource/rexource/rexource.component';
import { PagesComponent } from './page/pages/pages.component';
import { ActionsComponent } from './action/actions/actions.component';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [NgClass, RexourceComponent, PagesComponent, ActionsComponent],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent
{
    pageTitle:string = 'User Management'
    page: number = -1
    level: string = 'Management'

    role: number = -1
    roles:any[] = [
      { id: 'admin', name:'Admin' },
      { id: 'manager', name:'Manager' },
      { id: 'secretary', name:'Secretary' }
    ] 
    resource: {  id: number, name: string } = { id: -1, name: "" }
    resources:any[] = [
      { id: 0, name:'Resource' },
      { id: 1, name:'Pages' },
      { id: 2, name:'Actions' }
    ] 

    roleForm: FormGroup;    

    constructor()
    {
        this.roleForm = new FormGroup(
        {
          role: new FormControl('', [Validators.required])
        }) 
    }
    
    GoToPage(page: number)
    {
      this.page = page
    }

}
