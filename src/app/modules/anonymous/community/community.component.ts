import { Component } from '@angular/core';
import { PlacardComponent } from '../../../components/placard/placard.component';
import { MakePostComponent } from './make-post/make-post.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { WysiwygComponent } from '../../../library/wysiwyg/wysiwyg.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [PlacardComponent, MakePostComponent, ModalComponent, WysiwygComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {

  newPost: boolean = false
  title: string = 'Create New Post'
  modalWidth: string = 'width-[900px]'
  height: { height: string } = { height: '100px' }

  content: any = 'write plan'

  imageStyle: any = {
    'border-radius' : '20%'
  }

  sidebarData = [
    { label: 'Profile', path: '/user/info', icon: '' },
    { label: 'Photograph', path: '/user/upload-passport', icon: '' },
  ]

  pageLinks = [
    { label: 'Feed', path: '/user/info', icon: '' },
    { label: 'Connections', path: '/user/upload-passport', icon: '' },
    { label: 'Latest News', path: '/user/upload-passport', icon: '' },
    { label: 'Events', path: '/user/upload-passport', icon: '' },
    { label: 'Groups', path: '/user/upload-passport', icon: '' },
    { label: 'Notifications', path: '/user/upload-passport', icon: '' },
    { label: 'Settings', path: '/user/upload-passport', icon: '' },
  ]

  latestNews = [
    { label: 'Ten questions you should answer truthfully', time: '2hr', path: '/user/info', icon: '' },
    { label: 'Connections', path: '/user/upload-passport', time: '3hr', icon: '' },
    { label: 'Latest News', path: '/user/upload-passport', time: '4hr', icon: '' },
    { label: 'Events', path: '/user/upload-passport', time: '6hr', icon: '' },
  ]

  toFollow = [
    { fullname: 'Judy Nguyen', profession: 'News anchor', path: '/user/info', icon: '' },
    { fullname: 'Amanda Reed', path: '/user/upload-passport', profession: 'Web Developer', icon: '' },
    { fullname: 'Billy Vasquez', path: '/user/upload-passport', profession: 'News anchor', icon: '' },
    { fullname: 'Carolyn Ortiz', path: '/user/upload-passport', profession: 'News anchor', icon: '' },
  ]

  onConfirm = () =>
  {

  }


}
