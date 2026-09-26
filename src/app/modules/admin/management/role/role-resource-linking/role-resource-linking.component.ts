import { Component, input, model, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../state/app.state';
import { CONNECT_REXOURCE, DISCONNECT_REXOURCE, START_REXOURCE } from '../../../../../state/actions/management/rexource.actions';
import { sleepWait } from '../../../../../util/sleep';
import { getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';
import { getAllRexource } from '../../../../../state/selectors/admin/management/rexource.selector';
import { LoaderComponent } from '../../../../../components/loader/loader.component';

@Component({
  selector: 'app-role-resource-linking',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './role-resource-linking.component.html',
  styleUrl: './role-resource-linking.component.scss'
})
export class RoleResourceLinkingComponent implements OnInit {

  isLoading = signal<boolean>(false)
  resources = signal<any>([])
  roleId = input<string>('')
  roleName = input<string>('')
  roleResourceTitle = input<string>('')
  selectedPage = signal<{ id: string}>({ id: '' })
  theRoleResources = model<any>([])

  constructor(private store: Store<AppState>){}

  async ngOnInit()
  {
    this.store.dispatch(START_REXOURCE({ page: Number(1), limit: Number(100) }))
    this.isLoading.set(true) 
    await sleepWait(500)
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {       
      if(data?.loader?.statusCode === 200 && data?.loader?.page === 'rexource')
      {
        this.isLoading.set(data?.loader?.loading)
      }
    }) 

    this.store.select(getAllRexource).subscribe((rexrc: any) => 
    {
      this.resources.set(rexrc?.rexources)
    })    
  }

  connectResourceToRole = (resource: string, role: string) => 
  {
    console.log(resource, role)
    this.theRoleResources.update(currentItems => [...currentItems, resource]);
    this.store.dispatch(CONNECT_REXOURCE({ role: role, rexource: resource }))
  }

  disconnectRexourceFromRole = (resource: string, role: string) =>
  {
    this.removeObject(resource)
    this.store.dispatch(DISCONNECT_REXOURCE({ role: role, rexource: resource }))
  }

  removeObject(item: any) 
  {
    const index = this.theRoleResources().indexOf(item);
    if (index > -1) 
    {
      this.theRoleResources().splice(index, 1);
    }
  }



}
