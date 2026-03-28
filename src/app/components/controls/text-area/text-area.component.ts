import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextAreaValueAccessorDirective } from '../../../directives/text-area/text-area-value-accessor.directive';
import { TextAreaValidationComponent } from '../../../validations/text-area-validation/text-area-validation.component';


@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule, TextAreaValidationComponent],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent<T> extends TextAreaValueAccessorDirective<T> {

    @Input()
    id: string = ""

    @Input()
    name: string = ""

    @Input()
    rows: number = 10

    @Input()
    cols: number = 45

    @Input()
    placeholder: string = ""

    @Input()
    disabled: boolean = false
    
    @Input() customErrorMessages: Record<string, string> = { }

}
