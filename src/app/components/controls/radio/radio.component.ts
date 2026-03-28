import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioCheckValueAccessorDirective } from '../../../directives/radio-check/radio-check-value-accessor.directive';
import { RadioCheckValidationComponent } from '../../../validations/radio-check-validation/radio-check-validation.component';


@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule, RadioCheckValidationComponent],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true 
    }
  ]
})
export class RadioComponent<T> extends RadioCheckValueAccessorDirective<T> 
{
   @Input() id: string | undefined;
   @Input() name: string | undefined;
    
  //  @Input() value: string = ''

   @Input() checked: boolean = false;
   @Input() checkBoxValue!: string;
   @Input() disabled: boolean = false;
 
   @Input() customErrorMessages: Record<string, string> = {} 

}
