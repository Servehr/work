import { Component } from '@angular/core';
import { WysiwygComponent } from '../../../../library/wysiwyg/wysiwyg.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';

@Component({
  selector: 'app-write-plan',
  standalone: true,
  imports: [WysiwygComponent, BotinComponent],
  templateUrl: './write-plan.component.html',
  styleUrl: './write-plan.component.scss'
})
export class WritePlanComponent {
  
  content: any = 'write plan'

  closeModal()
  {
    
  }

}
