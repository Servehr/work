import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SettingsControlComponent } from '../../settings/settings-control/settings-control.component';
import { SelectComponent } from '../../../../components/controls/select/select.component';
import { MakeSelection } from '../../../auth/register/register.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, SettingsControlComponent, SelectComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent 
{
    pageTitle:string = 'User Management'
    activeTabIndex: number = 4
    level: string = 'Management'

    permsssion: string = '-1'
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

    errorMessages = 
    { 
      departmentNameRequired: 'Enter department name', 
      departmentDescriptionRequired: 'Write a note about department to be created'
    }       

    actionForm: FormGroup;    

    constructor()
    {
        this.actionForm = new FormGroup(
        {
          userRole: new FormControl('-1', [MakeSelection])
        }) 
    }
    
    ControlPage(resource: { id: string, name: string })
    {
      this.permsssion = '3'
      this.resource = resource
    }

}