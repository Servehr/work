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

    role: number = -1
    roles:any[] = [
      { id: 'admin', name:'Admin' },
      { id: 'vendors', name:'Vendors' },
      { id: 'partners', name:'Partners' }
    ] 
    
    resource: {  id: number, name: string } = { id: -1, name: "" }
    resources:any[] = [
      { id: 1, name:'Technicians' },
      { id: 2, name:'Vendors' },
      { id: 3, name:'Partners' }
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