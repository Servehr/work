import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { SearchComponent } from '../../../components/search/search.component';
import { NotificationComponent } from '../../../components/notification/notification.component';
import { bootstrapHouseDoorFill, bootstrapList, bootstrapPersonBoundingBox } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, NotificationComponent, NgIcon, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    menu: boolean = false
    iconSize: string = '20'
    isHover: number = 0
    openMobileNav : boolean = false
    hamburger: any = bootstrapList
    enableViewResults = signal<boolean>(false)

    home: any = bootstrapHouseDoorFill
    style: any = {
       'background-color' : '#be9d18',
       'color': 'black',
       'padding': '20px'
    }

    @Input() toggleSideBarMenu: boolean = false
    
    @Input() SideBar: boolean = false
    @Output() toggleBar: EventEmitter<boolean> = new EventEmitter()



    constructor(private router: Router){}

    ngOnInit(): void 
    {
       this.enableViewResults.set(true)
    }

    goHome(to: any)
    {
      this.router.navigate([to])
    }

    OpenSideBar()
    {
      this.toggleBar.emit(true)
    }

    ChangeOnButtonHoverIn()
    {
       this.style = {
         'background-color' : '#776005',
         'color': 'white',
         'padding': '20px'     
       }
    }

    ChangeOnButtonHoverOut()
    {
       this.style = {
          'background-color' : '#be9d18',
          'color': 'black',
          'padding': '20px'   
       } 
    }

    goTo(page: string)
    {
      this.router.navigate([page])    
    }
    

}
