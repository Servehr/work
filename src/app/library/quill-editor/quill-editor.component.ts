import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [QuillModule],
  templateUrl: './quill-editor.component.html',
  styleUrl: './quill-editor.component.scss'
})
export class QuillEditorComponent {

  content: any

}
