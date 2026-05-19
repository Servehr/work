import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsControlComponent } from './settings-control/settings-control.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgClass, SettingsControlComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  
    pageTitle:string = 'Settings'
    activeTabIndex: number = 0
    level: string = 'Management'

    role: string = '-1'
    value: string = ''

    roles:any[] = 
    [
      { id: '1', name:'Admin' },
      { id: '2', name:'Manager' },
      { id: '2', name:'Secretary' }
    ] 
    resource: {  id: string, name: string } = { id: '-1', name: "" }
    resources:{ id: string, name: string }[] = [
      { id: '1', name:'Merchant' },
      { id: '2', name:'Staff' },
      { id: '3', name:'Transactions' },
      { id: '4', name:'Leave' },
      { id: '5', name:'Profile' }
    ]  

    roleForm: FormGroup;    

    constructor()
    {
        this.roleForm = new FormGroup(
        {
          role: new FormControl('', [Validators.required])
        }) 
    }
    
    ControlPage(resource: { id: string, name: string })
    {
      this.role = "3"
      this.resource = resource
    }

}