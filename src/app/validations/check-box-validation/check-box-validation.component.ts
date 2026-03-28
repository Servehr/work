import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { CheckBoxValueAccessorDirective } from '../../directives/check-box/check-box-value-accessor.directive';


@Component({
  selector: 'app-check-box-validation',
  standalone: true,
  imports: [JsonPipe, KeyValuePipe],
  templateUrl: './check-box-validation.component.html',
  styleUrl: './check-box-validation.component.scss'
})
export class CheckBoxValidationComponent<T> extends CheckBoxValueAccessorDirective<T> implements OnChanges {
   
    @Input() errors: Record<string, ValidationErrors> | null = { };

    @Input() errorMessages: Record<string, string> = { }
    
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
    }
}