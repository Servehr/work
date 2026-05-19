import { JsonPipe, NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ImageComponent } from '../controls/image/image.component';

interface UserInfo  { 
  id: string, 
  image: string, 
  alt: string, 
  firstname: string, 
  surname: string, 
  skills: string[], 
  rating: number, 
  status: string 
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ImageComponent, NgClass, JsonPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

    height: number = 200
    width: number = 200

    user = input.required<UserInfo>()

    call = input<string>()

    imageStyle: any = {
      'border-radius' : '20%'
    }

    viewUserInfo = () => 
    {
       
    }

}
