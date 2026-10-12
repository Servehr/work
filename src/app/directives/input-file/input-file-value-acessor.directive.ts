import { Directive, inject, Inject, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, Validators } from '@angular/forms';
import { reduceImageSize } from '../../util/image';


@Directive({
  selector: '[appInputFileValueAcessor]',
  standalone: true
})
export class InputFileValueAcessorDirective<T> implements ControlValueAccessor, OnInit {
  
  control!: FormControl
  isRequired = false

  previewUrl: string | null = null;
  
  file: File | null = null;
  disabled = false;

  public onChange: (value: File | null) => void = () => {};
  public onTouched: () => void = () => {};

  ngOnInit(): void 
  {
      this.setFormControl()
      this.isRequired = this.control?.hasValidator(Validators.required) ? true : false    
  }

  constructor(@Inject(Injector) private injector: Injector)
  {
     console.log("Did i get here")
  }

  setFormControl()
  {
    try 
    {
      const formControl = this.injector.get(NgControl)
      // console.log(formControl)
      switch(formControl.constructor)
      {
        case FormControlName:
         console.log("InBetween")
         this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName)
         console.log(this.control)
         break;
        default:                  
         console.log("Default")
         this.control = (formControl as FormControlDirective).form as FormControl
         break;
      } 
    } catch (error) {
         this.control = new FormControl()
    }
   }

   //   // Writes value from the parent form to this component
   //   writeValue(value: any): void 
   //   {
   //     // Note: You cannot programmatically set the 'value' of a file input for security.
   //     // This typically just clears the local state.
   //     console.log(this.control)
   //     console.log(value)
   //     this.file = value;
   //   }

  writeValue(value: File | string | null): void 
  {console.log("rrrrrrrrrrrrrrrrrrrrr")
    console.log(value)
    if (!value) 
    {
      this.previewUrl = null;
      return;
    }
    if (typeof value === 'string') 
    {console.log("Hellooo")
      console.log(this.control)
      this.onChange(null);
      this.previewUrl = value;
    } 
     else if (value instanceof File) 
    {console.log("WhatsUp")
      this.createPreview(value);
      console.log(this.control)
    }
  }

  registerOnChange(fn: (value: File | null) => void): void 
  {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void 
  {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onFileSelect(event: any): void 
  {
     const selectedFile: File = event.target.files[0];
     this.onTouched();
         
     console.log(selectedFile)

     if (!selectedFile) 
     {
        this.file = null;
        this.onChange(null);
        return;
     }

     // Validation logic (e.g., max size 2MB and PDF only)
     const maxSize = 2 * 1024 * 1024;
     if (selectedFile.size > maxSize) 
     {
       // this.errorMessage = 'File size must be less than 2MB.';
       this.onChange(null);
       return;
     }

     // if (selectedFile.type !== 'application/pdf') 
     if (selectedFile.type.startsWith('image/'))
     {
       // this.errorMessage = 'Only PDF files are allowed.';
       this.onChange(null);
       return;
     }

     //  this.errorMessage = null;
     this.file = selectedFile;
     this.onChange(this.file);
  }

 ////////////////
 onFileSelected(event: Event): void 
 {
   const input = event.target as HTMLInputElement;
   console.log(input.files)
   if (input.files && input.files.length > 0) 
   {
     const fileType = input.files[0].type
     if (fileType.startsWith('image/')) 
     {
       this.processFile(input.files[0]);
     }
   }
 }

 private processFile = async (file: File) =>
 {
   this.createPreview(file);
   const toBase64Version: any = this.toBase64(file)
   const reducedImage: any = await reduceImageSize(toBase64Version)
  //  this.onTouched();
 }

 toBase64 = (file: any) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
 })

 private createPreview(file: File): void 
 {
   const reader = new FileReader();
   reader.onload = () => {
     this.onTouched();
     this.onChange(file)
     this.previewUrl = reader.result as string;
   };
   reader.readAsDataURL(file);
 }

 clearFile(event: Event): void 
 {
   event.stopPropagation();
   this.previewUrl = null;
   this.onChange(null);
   this.onTouched();
 }  

}
