import { NgClass } from '@angular/common';
import { Component, input, Input, model, output } from '@angular/core';
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
    selectedResource = input<string>('')
    resources = model<any>([])

    roleForm: FormGroup;    

    constructor()
    {
        this.roleForm = new FormGroup(
        {
          role: new FormControl('', [Validators.required])
        }) 
    }
    
    ControlPage(resource: { _id: string, name: string })
    {
      this.resources.set(resource)
    }

}