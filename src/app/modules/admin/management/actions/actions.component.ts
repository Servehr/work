import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../../../../notifications/administration';
import { ROLE_RESOURCES, START_REXOURCE_PAGES_ACTIONS } from '../../../../state/actions/management/rexource.actions';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, SettingsControlComponent, SelectComponent, LoaderComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit, OnDestroy
{
    private administration = inject(AdministrationService)
    
    pageTitle:string = 'User Management'
    activeTabIndex: number = 4
    level: string = 'Management'
    isLoading = signal<boolean>(false)
    selectedRole = signal<string>('')
    roleResources = signal<any>([])


    private sub!: Subscription;  

    selectedResource = signal<string>('')
    selectedResourceName = signal<string>('')
    value: string = ''

    roles = signal<any>([])

    resources = signal<any>([])

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
        this.roles.set(role?.roles)
      }) 

      this.sub = this.administration.data$.subscribe((data: any) => 
      {
         if(data?.condition === 'roles')
         {
           this.roleResources.set(data?.data)
         }         
      })
    }
      
    ControlPage(resource: { _id: string, name: string })
    {
      this.selectedResource.set(resource?._id)
      this.selectedResourceName.set(resource?.name)
      this.resources.set(resource)
      this.store.dispatch(START_REXOURCE_PAGES_ACTIONS({ role: this.selectedRole(), rexource: resource?._id }))
    }

    resourcesUnderRole(data:any)
    {
      this.selectedRole.set(data)
      if(data != -1)
      {
        this.store.dispatch(ROLE_RESOURCES({ role: data }))
      }
    }    

    ngOnDestroy(): void 
    {
      this.sub.unsubscribe();
    }  

}