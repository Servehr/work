import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputFieldValidationComponent } from '../../../validations/input-field-validation/input-field-validation.component';
import { InputFieldValueAccessorDirective } from '../../../directives/input-field/input-field-value-accessor.directive';


type InputType = 'text' | 'password' | 'email' | 'number'

@Component({
  selector: 'input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass, ReactiveFormsModule, InputFieldValidationComponent],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  providers: [
     {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputFieldComponent),
        multi: true
     }
  ]
})
export class InputFieldComponent<T> extends InputFieldValueAccessorDirective<T> {

    // style: string = 'rounded-lg'
   @Input()
   style: any = {
       'border-raidus' : '0%'
    }

    @Input()
    id: string = ""

    @Input()
    name: string = ""

    @Input()
    type: string = "text"

    @Input()
    placeholder: string = ""

    @Input()
    userValue: string = ''

   //  @Input()
   //  override value: string = ""

   //  @Input()
   //  value: string = 'innocent'

    @Input()
    disabled: boolean = false
    
    @Output()
    changedInput: EventEmitter<{ value: string; type: string }> = new EventEmitter<{ value: string; type: string }>()
    
    @Input() customErrorMessages: Record<string, string> = { }
    
    InputChange(event: any)
    {
      let userInput = event?.target?.value
      this.value = userInput
      this.changedInput.emit({ value: userInput, type: this.name })

      // const val = (event.target as HTMLInputElement).value;
      // this.value = val
    }

    InputFocus()
    {
      
    }

}

