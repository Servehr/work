import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SettingsControlComponent } from '../../settings/settings-control/settings-control.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, SettingsControlComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent 
{
    pageTitle:string = 'User Management'
    activeTabIndex: number = 4
    level: string = 'Management'

    role: number = -1
    roles:any[] = [
      { id: 'admin', name:'Admin' },
      { id: 'manager', name:'Manager' },
      { id: 'secretary', name:'Secretary' }
    ] 
    resource: {  id: number, name: string } = { id: -1, name: "" }
    resources:{ id: number, name: string }[] = [
      { id: 1, name:'Merchant' },
      { id: 2, name:'Staff' },
      { id: 3, name:'Transactions' },
      { id: 4, name:'Leave' },
      { id: 5, name:'Profile' }
    ] 

    roleForm: FormGroup;    

    constructor()
    {
        this.roleForm = new FormGroup(
        {
          role: new FormControl('', [Validators.required])
        }) 
    }
    
    ControlPage(resource: { id: number, name: string })
    {
      this.role = 3
      this.resource = resource
    }

}