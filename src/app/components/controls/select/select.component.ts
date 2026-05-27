import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOptionValidationComponent } from '../../../validations/select-option-validation/select-option-validation.component';
import { NgStyle } from '@angular/common';
import { SelectOptionValueAccessorDirective } from '../../../directives/select-option/select-option-value-accessor.directive';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SelectOptionValidationComponent, NgStyle],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true 
    }
  ]
})
export class SelectComponent<T> extends SelectOptionValueAccessorDirective<T> {
    
    style: any = {
      'color': '#a39351'
    }

    selectedOption: string = ''
    
    @Input()
    title: string = ''

    @Input()
    // id: { id: string, name: string }[] = []
    id: string = ""

    @Input()
    // name: { id: string, name: string }[] = []
    name: string = ""

    @Input()
    options: { id: string, name: string }[] = []
    // options: string = ""

    @Input()
    type: string = "text"

    @Input()
    placeholder: string = ""

    @Input()
    disabled: boolean = false
    
    @Output()
    changeSelection: EventEmitter<{ value: string; type: string }> = new EventEmitter<{ value: string; type: string }>()
    
    @Input() customErrorMessages: Record<string, string> = { }
    

}
