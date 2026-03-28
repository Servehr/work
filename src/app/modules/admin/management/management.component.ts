import { Component, Input } from '@angular/core';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { DepartmentComponent } from './department/department.component';
import { RoleComponent } from './role/role.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ActionsComponent } from './actions/actions.component';
import { TabsComponent } from '../../../components/tabs/tabs.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [TabsComponent, LocationComponent, CategoryComponent, DepartmentComponent, RoleComponent, AuthorizationComponent, ActionsComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent {

    title: string = 'System Management'

    TabPages: string[] = ["Categories", "Department", "Role", "Resources", "Actions", "Location"]
    page: number = 0

    @Input() fieldId: string = 'search-merchant'

    setPage(page: any)
    {
       this.page = page
    }

}
