import { Component, signal } from '@angular/core';
import { ImageComponent } from '../../../components/controls/image/image.component';
import { JsonPipe, NgClass } from '@angular/common';
import { UserCardComponent } from '../../../components/user-card/user-card.component';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ImageComponent, NgClass, UserCardComponent, JsonPipe],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss'
})
export class UserSearchComponent {

  height: number = 300
  width: number = 400

  imageStyle: any = {
    'border-radius' : '20%'
  }

  users = signal([
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Moham",
       surname: "Wright",
       skills: ['Painter', 'Screeding'],
       rating: 5,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Blessing",
       surname: "Favour",
       skills: ['Cleaning', 'Rubbing'],
       rating: 2,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Stephen",
       surname: "Phillip",
       skills: ['Washer', 'Dryer'],
       rating: 4,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Mustapha",
       surname: "Martins",
       skills: ['Electrician', 'Wiring'],
       rating: 3,
       status: 'inactive'
     }
   ])

   viewUserInfo = () => 
   {
     
   }

}
