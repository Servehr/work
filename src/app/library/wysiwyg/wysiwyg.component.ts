import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-wysiwyg',
  standalone: true,
  imports: [FormsModule, QuillEditorComponent],
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.scss'
})
export class WysiwygComponent {

  @Input() content: any = 'editor'

}
