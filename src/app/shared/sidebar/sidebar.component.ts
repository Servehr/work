import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  private router = inject(Router)

  menuItems = input<{ label: string, path: string, icon: string }[]>([])

  goTo = (path: string) => 
  {
     this.router.navigate([path])
  }

}
