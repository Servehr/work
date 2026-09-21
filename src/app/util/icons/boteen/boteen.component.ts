import { NgClass, NgStyle } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-boteen',
  standalone: true,
  imports: [NgStyle, NgClass, NgIcon],
  templateUrl: './boteen.component.html',
  styleUrl: './boteen.component.scss'
})
export class BoteenComponent implements OnInit {
    
  readonly value = input<{ page?: string, count: number, data: any }>()
  readonly clickEvent = output<any>()
  actonLength = input<any>()
  boteenStyle = input.required<any>()
  readonly boteeName = input.required()
  boteenCssClass = input.required<any>()
  icon: any

  style: any = {
    'color': 'red'
  }

  ngOnInit(): void 
  {
    
  }

  onClick(): void 
  {console.log(this.value())
    if(this.value()?.page)
    {
       const data = { page: this.value()?.page, data: this.value()?.data }
       this.clickEvent.emit(data)
    } else {
       this.clickEvent.emit(this.value()?.data)
    }
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
     'color': '#000000'   
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = 
    {
      'color': 'red'  
    } 
  }

}
