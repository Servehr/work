import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/anonymous/footer/footer.component';
import { HeaderComponent } from '../../shared/anonymous/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { PlacardComponent } from '../../components/placard/placard.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, PlacardComponent, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  imageStyle: any = {
    'border-radius' : '20%'
  }

  sidebarData = [
    { label: 'Profile', path: '/user/info', icon: '📊' },
    { label: 'Upload', path: '/user/upload', icon: '⚙️' },
    { label: 'Passport', path: '/user/passport', icon: '⚙️' },
    { label: 'Subscription', path: '/user/subscription', icon: '⚙️' },
    { label: 'Settings', path: '/user/setting', icon: '⚙️' }
  ]

}
