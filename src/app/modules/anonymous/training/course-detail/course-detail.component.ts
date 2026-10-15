import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  courseOutline: string = '../../../../../training/bannner.jpg'

  courseCover: string = './../../../../../training/welding.jpg'

  theImg = signal<string>('./../../../../../training/welding.jpg')

}
