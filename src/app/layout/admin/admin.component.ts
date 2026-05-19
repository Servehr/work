import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/admin/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/admin/header/header.component';
import { FooterComponent } from '../../shared/admin/footer/footer.component';
import { bootstrapList, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgIcon, NgClass, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

    openMobileNav : boolean = false;
    
    @Input() toggleSideBar: boolean = true

    constructor(){}

    OpenSideBar(status: any)
    {
       this.openMobileNav = status
    }

    CloseSideBar()
    {
       this.openMobileNav = false
    }

    getIt()
    {
        this.openMobileNav = false 
    }

    



}
