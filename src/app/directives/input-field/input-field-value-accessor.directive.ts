import { Directive, Inject, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators, NgControl, FormControlName, FormGroupDirective, FormControlDirective } from '@angular/forms';
import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';

@Directive({
  selector: '[appInputFieldValueAccessor]',
  standalone: true
})
export class InputFieldValueAccessorDirective<T> implements ControlValueAccessor, OnInit {

    control!: FormControl
    isRequired = false
    
    @Input()
    value: string = 'saw'

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

    writeValue(value: T): void 
    {
      // console.log(this.control.value)
      // this.control ? this.control?.setValue(value) : (this.control = new FormControl(value) )
      // console.log(this.control)

      // if (value === null) {
      //    this.control.reset(); // Clear internal form control
      // }
      // console.log(value)
      // if (value !== null) {
      //    // this.control ? this.control?.setValue(value) : (this.control = new FormControl(value) )
      //    if(this.control)
      //    {
      //       this.control?.setValue(value)
      //    } else {
      //       console.log('Here')
      //       this.control = new FormControl(value)
      //    }
      // }      
      
      // if (value) {
      //    // Use { emitEvent: false } to stop recursion
      //    this.control.setValue(value, { emitEvent: false });
      // }

      if (value !== this.control.value) 
      { 
         // Only update if different
         // console.log(value)
         this.control.patchValue(value, { emitEvent: false });
      }
    }

    registerOnChange(fn: (val: T | null) => T): void {
      this.control?.valueChanges
        .pipe(
             takeUntil(this._isDestroyed$),
             startWith(this.control.value),
             distinctUntilChanged(),
             tap((val) => fn(val))
          ).subscribe((data) => {
            //  console.log(this.control.value)
            // this.control?.markAsUntouched()
            // this._onChanged(data)
          })
    }

    registerOnTouched(fn: () => T): void {
      this._onTouched = fn
    }
    
    setDisabledState?(isDisabled: boolean): void {
       this._isDisabled = isDisabled
    }

    onInputChange(event: Event)
    {
       const val = (event.target as HTMLInputElement).value
      //  this.control = val
      this.value = val
      this._onChanged(val)
    }

    
    

}