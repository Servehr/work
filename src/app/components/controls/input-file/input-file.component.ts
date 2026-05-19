import { Component, forwardRef, Input } from '@angular/core';
import { InputFileValueAcessorDirective } from '../../../directives/input-file/input-file-value-acessor.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFileValidationComponent } from '../../../validations/input-file-validation/input-file-validation.component';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputFileValidationComponent],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  providers: [
     {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputFileComponent),
        multi: true
     }
  ]
})
export class InputFileComponent<T> extends InputFileValueAcessorDirective<T> {

   id: string = ''

   name: string = ''

   @Input() customErrorMessages: Record<string, string> = { }



}
