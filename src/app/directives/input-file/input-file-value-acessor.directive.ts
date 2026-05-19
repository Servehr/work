import { Directive, Inject, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputFileValueAcessor]',
  standalone: true
})
export class InputFileValueAcessorDirective<T> implements ControlValueAccessor, OnInit {
  
  control!: FormControl
  
  file: File | null = null;
  disabled = false;

  ngOnInit(): void 
  {
    
  }

  constructor(@Inject(Injector) private injector: Injector){}

  setFormControl()
      {
         try 
         {
            const formControl = this.injector.get(NgControl)
            switch(formControl.constructor)
            {
               case FormControlName:
                  this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName)
                  break;
               default:
                  this.control = (formControl as FormControlDirective).form as FormControl
                  break;
            } 
         } catch (error) {
            this.control = new FormControl()
         }
      }

  // Callbacks registered by Angular
  onChange = (file: File | null) => {};

  onTouched = () => {};

  onFileSelected(event: Event) 
  {
     const element = event.currentTarget as HTMLInputElement;
     const fileList: FileList | null = element.files;
     if (fileList && fileList.length > 0) 
     {
       this.file = fileList[0];
       this.onChange(this.file); // Notifies Angular of the new value
     }
  }

  // Writes value from the parent form to this component
  writeValue(value: any): void 
  {
    // Note: You cannot programmatically set the 'value' of a file input for security.
    // This typically just clears the local state.
    console.log(this.control)
    this.file = value;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }

  registerOnTouched(fn: any): void { this.onTouched = fn; }
  
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

}
