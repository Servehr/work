import { Directive, EventEmitter, Inject, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators, NgControl, FormControlName, FormGroupDirective, FormControlDirective } from '@angular/forms';
import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';

@Directive({
  selector: '[appSelectOptionValueAccessor]',
  standalone: true
})
export class SelectOptionValueAccessorDirective<T> implements ControlValueAccessor, OnInit {

    control!: FormControl
    isRequired: boolean = false

    @Output() changedValue: EventEmitter<string> = new EventEmitter()

    selectedValue: string = ""
    
    @Input()
    value: string = ''

    private _isDisabled: Boolean = false
    private _isDestroyed$: any = new Subject<void>()
    private _onTouched! : () => T
    private _onChanged: (value: any) => void = () => {}
    

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

    writeValue(value: T): void {
      this.control ? this.control?.setValue(value) : (this.control = new FormControl(value) )
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
      this.selectedValue = value
      this._onTouched();
      this._onChanged(value);
    }

    onChange(newValue: Event): void
    {
      const selectedValue = (newValue.target as HTMLSelectElement).value;
      this.value = selectedValue
      this._onChanged(selectedValue)
      this._onTouched()
      this.changedValue.emit(selectedValue)
    }


}

