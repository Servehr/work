import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-role-resource-linking',
  standalone: true,
  imports: [],
  templateUrl: './role-resource-linking.component.html',
  styleUrl: './role-resource-linking.component.scss'
})
export class RoleResourceLinkingComponent {

   resources = signal<any>([])

}
