import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-role-resource',
  standalone: true,
  imports: [],
  templateUrl: './role-resource.component.html',
  styleUrl: './role-resource.component.scss'
})
export class RoleResourceComponent {

  roleName = signal<string>('')
  resources = signal<any>([])

}
