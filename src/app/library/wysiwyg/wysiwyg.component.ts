import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'app-wysiwyg',
  standalone: true,
  imports: [FormsModule, QuillEditorComponent],
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.scss'
})
export class WysiwygComponent {

  placeHolder: string = 'Type your content here...'
  @Input() content: any = ''
  @Output() inputedData: EventEmitter<string> = new EventEmitter()

  handleBlur = () => 
  {
     this.inputedData.emit(this.content)
  }

  editorModules = {
    keyboard: {
      bindings: {
        shiftEnter: {
          key: 'Enter',
          shiftKey: true,
          handler: (range: any, context: any) => {
            // Sanya sabon layi (\n) maimakon <p> tag
            this.quill?.insertText(range.index, '\n', 'user');
            this.quill?.setSelection(range.index + 1, 'user');
            return false; // Hana Quill yin default action dinsa
          }
        }
      }
    }
  };

  private quill!: Quill;

  onEditorCreated(quillInstance: Quill) {
    this.quill = quillInstance;

    // 2. Sanya Clipboard Matcher don kula da pasting na <br>
    const clipboard = this.quill.clipboard;
    const Delta = Quill.import('delta');

    clipboard.addMatcher('BR', (node, delta) => {
      // Canza duk <br> da aka yi pasting zuwa soft break (\n)
      return new Delta().insert('\n');
    });
  }


}
