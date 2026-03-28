import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { bootstrapPersonBoundingBox, bootstrapBellFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIcon, RouterLink, RouterModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

   personBox: any = bootstrapPersonBoundingBox
   notification: any = bootstrapBellFill
   iconSize: string = '20'

}
