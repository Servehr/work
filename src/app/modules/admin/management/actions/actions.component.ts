import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SettingsControlComponent } from '../../settings/settings-control/settings-control.component';
import { SelectComponent } from '../../../../components/controls/select/select.component';
import { MakeSelection } from '../../../auth/register/register.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { START_ROLE } from '../../../../state/actions/management/role.actions';
import { sleepWait } from '../../../../util/sleep';
import { getSpinnerStatus } from '../../../../state/selectors/spinner.selector';
import { getAllRole } from '../../../../state/selectors/admin/management/role.selector';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, SettingsControlComponent, SelectComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit 
{
    pageTitle:string = 'User Management'
    activeTabIndex: number = 4
    level: string = 'Management'
    isLoading = signal<boolean>(false)
    

    permsssion: string = '-1'
    value: string = ''

    roles = signal<any>([])

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

    constructor(private store: Store<AppState>)
    {
        this.actionForm = new FormGroup(
        {
          userRole: new FormControl('-1', [MakeSelection])
        }) 
    }
    

    async ngOnInit()
    {
      this.store.dispatch(START_ROLE({ page: Number(1), limit: Number(100) }))
      this.isLoading.set(true)  
      await sleepWait(500)
      this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
        this.isLoading.set(data?.loader?.loading)
      }) 

      this.store.select(getAllRole).subscribe((role: any) => 
      {
        this.isLoading.set(false)
        console.log(role?.roles)
        console.log(role)
        this.roles.set(role?.roles)
      })    
    }
      
    ControlPage(resource: { id: string, name: string })
    {
      this.permsssion = '3'
      this.resource = resource
    }

}