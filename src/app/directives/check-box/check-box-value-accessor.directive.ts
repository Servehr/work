import { Directive, EventEmitter, Inject, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appCheckBoxValueAccessor]',
  standalone: true
})
export class CheckBoxValueAccessorDirective<T> implements ControlValueAccessor, OnInit {

    control!: FormControl
    isRequired: boolean = false
    selectedValue: string | undefined
    
      
    @Input() value: string = ''
    
   @Input() radioBoxValue!: string;
  
    private _isDisabled: Boolean = false
    private _isDestroyed$: any = new Subject<void>()
    private _onTouched! : () => T
    private _onChanged: (value: any) => void = () => {}
       
   @Output()
   ChoosenTick: EventEmitter<{ value: string; type: string }> = new EventEmitter<{ value: string; type: string }>()
      
  
    constructor(@Inject(Injector) private injector: Injector){}
  
    ngOnInit()
    {
       this.setFormControl()
       this.isRequired = this.control?.hasValidator(Validators.required) ? true : false
    }
  
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
  
    writeValue(value: T): void 
    {
      // if (value == null) { return; }
      // this.value = value.toString()
      // value && this.value.setValue(value, { emitEvent: false });
      if(value)
      {
          this.control ? this.control?.setValue(value) : (this.control = new FormControl(value) )
      }
    }
  
    registerOnChange(fn: (val: T | null) => T): void {
      this._onChanged = fn ;
    }
  
    registerOnTouched(fn: () => T): void {
      this._onTouched = fn
    }
      
    setDisabledState?(isDisabled: boolean): void {
      this._isDisabled = isDisabled
    }
  
    onModelChange(value: any) {
      // this._onTouched();
      this.value = value
      this.ChoosenTick.emit(value)
      this._onChanged(value);
    }
  
    onChange(newValue: Event): void
    {
      const selectedValue = (newValue.target as HTMLInputElement).value;
      this.value = selectedValue
      this._onChanged(selectedValue)
      this._onTouched()
    }
}
