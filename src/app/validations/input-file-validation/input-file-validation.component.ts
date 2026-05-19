import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { InputFileValueAcessorDirective } from '../../directives/input-file/input-file-value-acessor.directive';


@Component({
  selector: 'app-input-file-validation',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, KeyValuePipe],
  templateUrl: './input-file-validation.component.html',
  styleUrl: './input-file-validation.component.scss'
})
export class InputFileValidationComponent<T> extends InputFileValueAcessorDirective<T> implements OnChanges {
   
    @Input() errors: Record<string, ValidationErrors> | null = { };

    @Input() errorMessages: Record<string, string> =  {  }
    
    @Input() customErrorMessages: Record<string, string> = { }

    ngOnChanges(changes: SimpleChanges): void 
    {
       const { customErrorMessages } = changes
       
       if(customErrorMessages)
       {
          this.errorMessages = 
          {
             ...this.errorMessages, ...customErrorMessages.currentValue
          }
       }
       console.log(changes)
       console.log(this.errorMessages)
    }


}
