import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckBoxValidationComponent } from '../../../validations/check-box-validation/check-box-validation.component';
import { CheckBoxValueAccessorDirective } from '../../../directives/check-box/check-box-value-accessor.directive';


@Component({  
  selector: 'app-check',
  standalone: true,
  imports: [FormsModule, CheckBoxValidationComponent],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckComponent),
      multi: true 
    }
  ]
})
export class CheckComponent<T> extends CheckBoxValueAccessorDirective<T> 
{                                      
   @Input() id: string | undefined;
   @Input() name: string | undefined;

   @Input() checked: boolean = false;
   @Input() checkBoxValue!: string;
   @Input() disabled: boolean = false;
 
   @Input() customErrorMessages: Record<string, string> = {} 
   

}
