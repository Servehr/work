import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-role-resource',
  standalone: true,
  imports: [],
  templateUrl: './role-resource.component.html',
  styleUrl: './role-resource.component.scss'
})
export class RoleResourceComponent {

  title = input<string>('')
  roleName = input<string>('')
  resources = input<any>([])

}
