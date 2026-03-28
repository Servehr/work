import { Directive, EventEmitter, Inject, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators, NgControl, FormControlName, FormGroupDirective, FormControlDirective } from '@angular/forms';
import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';

@Directive({
  selector: '[appTextAreaValueAccessor]',
  standalone: true
})
export class TextAreaValueAccessorDirective<T> implements ControlValueAccessor, OnInit {

    control!: FormControl
    isRequired = false
    
    @Input()
    value: string = ''

    private _isDisabled: Boolean = false
    private _isDestroyed$: any = new Subject<void>()
    private _onTouched! : () => T
    private _onChanged: (value: any) => void = () => {}
    
    @Output()
    changedInput: EventEmitter<{ value: string }> = new EventEmitter<{ value: string }>()
    
    

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
      // console.log(this.control)
    }

    registerOnChange(fn: (val: T | null) => T): void {
      this._onChanged = fn ;
      // this.control?.valueChanges
      //   .pipe(
      //        takeUntil(this._isDestroyed$),
      //        startWith(this.control.value),
      //        distinctUntilChanged(),
      //        tap((val) => fn(val))
      //     ).subscribe(() => {
      //       // this.control?.markAsUntouched()
      //     })
    }

    registerOnTouched(fn: () => T): void {
      this._onTouched = fn
    }
    
    setDisabledState?(isDisabled: boolean): void {
       this._isDisabled = isDisabled
    }
  
    onModelChange(newValue: Event): void
    {
      const selectedValue = (newValue.target as HTMLTextAreaElement).value
      this._onTouched();
      this._onChanged(selectedValue);
    }
    

    InputChange(newValue: Event): void
    {
      const selectedValue = (newValue.target as HTMLTextAreaElement).value
      this._onChanged(selectedValue)
      this._onTouched()
    }
    

}