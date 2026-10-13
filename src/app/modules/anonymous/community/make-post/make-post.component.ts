import { Component, output } from '@angular/core';
import { WysiwygComponent } from '../../../../library/wysiwyg/wysiwyg.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { ImageUploadComponent } from '../../../../components/image-upload/image-upload.component';
import { MultipleImageUploadComponent } from '../../../../components/multiple-image-upload/multiple-image-upload.component';

@Component({
  selector: 'app-make-post',
  standalone: true,
  imports: [WysiwygComponent, BotinComponent, ImageUploadComponent, MultipleImageUploadComponent],
  templateUrl: './make-post.component.html',
  styleUrl: './make-post.component.scss'
})
export class MakePostComponent {
  
  content: any = 'Create New Post'
  closeModal = output<void>()

  errorMessages = 
  { 
    ninRequired: 'Kindly upload your Nin document',
    fileSizeExceeded: 'File maximum upload exceeded',
    invalidExtension: 'Only file types is allowed (png)'  
  } 

  closeImageUpload()
  {
     this.closeModal.emit()
  }

}
