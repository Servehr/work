import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { InputFieldValidationComponent } from '../../../validations/input-field-validation/input-field-validation.component';
import { SelectComponent } from '../../../components/controls/select/select.component';
import { IFileHandler } from '../../../interface/FileHandler';
import { DragDropDirective } from '../../../directives/drag-and-drop/drag-drop.directive';
import { ImageComponent } from '../../../components/controls/image/image.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { SetErrorMessage, SetLoadingStatus } from '../../../state/actions/spinner.action';
import { of, delay } from 'rxjs';
import { START_REGISTER } from '../../../state/actions/auth.actions';
import { getResponseMessage, getSpinnerStatus } from '../../../state/selectors/spinner.selector';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ImageUploadComponent } from '../../../components/image-upload/image-upload.component';
import { reduceImageSize } from '../../../util/image';
import { InputFileComponent } from '../../../components/controls/input-file/input-file.component';
import { InputFileValidationComponent } from '../../../validations/input-file-validation/input-file-validation.component';


export const FirstnameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { firstNameRequired : 'firstNameRequired' } :  null
}

export const SurnameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { surnameRequired : 'surnameRequired' } :  null
}

export const PhoneRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { phoneNumberRequired : 'phoneNumberRequired' } :  null
}

export const MakeSelection = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === '-1' ? { selectionRequired : 'selectionRequired' } :  null
}

export const PasswordRequired = (control: AbstractControl): ValidationErrors | null => 
{
//    var code = document.getElementById("password");
// var strengthbar = document.getElementById("meter");
// var display = document.getElementById("info");

// var strength = 0;
// // Define validation criteria and corresponding messages
// let validations = [
//   { pattern: /[a-z]+/, issue: 'Must include lowercase letters.' },
//   { pattern: /[A-Z]+/, issue: 'Must include uppercase letters.' },
//   { pattern: /[0-9]+/, issue: 'Must include numbers.' },
//   { pattern: /[$@#&!]+/, issue: 'Must include special characters.' },
//   { pattern: /.{8,}/, issue: 'Must be at least 8 characters long.' }
// ];
// // Check which conditions are met and provide user feedback
// let validationIssues = validations.filter(validation => {
//   return !password.match(validation.pattern);
// }).map(validation => validation.issue);

// if (validationIssues.length === 0) {
//    display.innerHTML = "Strong Password!";
//    strengthbar.value = 100;
// } else {
//    // Increment strength for each met condition
//    validations.forEach(validation => {
//    if (password.match(validation.pattern)) {
//       strength += 1;
//    }
// });
       
// display.innerHTML = "Weak Password. Issues: " + validationIssues.join(' ');
//    strengthbar.value = (strength / validations.length) * 100; // Update progress bar
// }

   return control.value?.length === 0 || control.value === null ? { passwordRequired : 'passwordRequired' } :  null
}

export const ConfirmPasswordRequired = (control: AbstractControl): ValidationErrors | null => 
{
   const pswd = control?.parent?.get('password')?.value
   const cPswd = control?.parent?.get('cPassword')?.value

   return control.value.length >  0 ? 
                                      control.value.length < 8 ? { passwordLength : 'passwordLength' } : pswd !== cPswd ? { confirmPasswordRequired: 'confirmPasswordRequired' } : null
                                    : { passwordRequired : "Enter Password" }
}

export const PassportRequired = (control: AbstractControl): ValidationErrors | null => 
{
   const passportDocument = control?.parent?.get('passportImage')?.value
   console.log(passportDocument)
   return control.value

  //  return control.value.length >  0 ? 
  //                                     control.value.length < 8 ? { passwordLength : 'passwordLength' } : pswd !== cPswd ? { confirmPasswordRequired: 'confirmPasswordRequired' } : null
  //                                   : { passwordRequired : "Enter Password" }
}

interface MeMe {
   [key: string] : string
}

export function fileValidator(location: string, maxSizeInBytes: number, allowedExtensions: string[]): ValidatorFn 
{
  return (control: AbstractControl): ValidationErrors | null => {
   const file = control.value as File;
   

   const formControl = control as FormControl;
   console.log(formControl)
   const passPort = formControl.get('passportImage');
   console.log("Boundary")
   console.log(passPort)

    // If no file is selected, pass validation (let 'Validators.required' handle empty states)
   if (!file) 
   {
     const documentToUpload: MeMe = {}
     documentToUpload[location] = location
     return documentToUpload
   }

   // Validate File Size
   if (file.size > maxSizeInBytes) 
   {
     // return { fileSizeExceeded: { max: maxSizeInBytes, actual: file.size } };
     return { fileSizeExceeded:  'fileSizeExceeded' };
   }

   // Validate File Extension
   const fileType = file.type
   const extension = fileType.split("/")
   if (!allowedExtensions.includes(extension[1])) 
   {
     // return { invalidExtension: { allowed: allowedExtensions, actual: fileExtension } };
     return { invalidExtension: 'invalidExtension' };
   }

    return null; // Return null if the control value passes validation
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
             RouterModule, InputFieldValidationComponent, InputFileValidationComponent, ReactiveFormsModule, InputFieldComponent, InputFileComponent,
             BotinComponent, NgStyle, SelectComponent, DragDropDirective, ImageComponent, NgIcon, AlertComponent, ImageUploadComponent
           ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent 
{
   title: string = 'Register'
   isLoading = signal(false);
   value: string = '-1'
   disabled: boolean = false
   ChangeOnHover: boolean = false
   message: string = ''
   statusCode!: number
   NIN: any[] = []
   passportPhotograph: any[] = []
   deleteIcon: any = bootstrapTrash
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }
   imageStyle: any = {
     'border-radius' : '20%'
   }

   private base64textString:String="";

   base64NinImage: string | ArrayBuffer | null = null
   base64PassportImage: string | ArrayBuffer | null = null
    
   categories:{ _id: string, name: string }[] = 
   [
      { _id: 'technician', name:'Technician' },
      { _id: 'apprenticeship', name:'TVet appretenship' },
      { _id: 'vendor', name:'Vendor' },
      { _id: 'agent', name:'Agent' },
      { _id: 'partner', name:'Partners' }
   ]
    
   plans:{ _id: string, name: string }[] = 
   [
      { _id: 'free', name:'Free' },
      { _id: 'Basic', name:'Basic' },
      { _id: 'Plus', name:'Plus' },
      { _id: 'premium', name:'Premium' },
      { _id: 'gold', name:'Gold' }
   ] 

   errorMessages = 
   { 
      firstNameRequired: 'Enter firstname', 
      surnameRequired: 'Enter surname', 
      phoneNumberRequired: 'Enter phone number',
      passwordLength: 'Minimum password length is 8',
      required: 'Enter email',
      email: 'Enter a valid email',
      selectionRequired: 'Make Selection',
      passwordRequired: 'Enter Pasword',
      passportRequired: 'Kindly upload your passport photograph',
      ninRequired: 'Kindly upload your Nin document',
      fileSizeExceeded: 'File maximum upload exceeded',
      invalidExtension: 'Only file types is allowed (png)'  
   } 
   // passportRequired: 'Kindly upload your passport photograph'

   // errorMessages = 
   // { 
   //    firstNameRequired: 'Enter firstname', 
   //    surnameRequired: 'Enter surname', 
   //    phoneNumberRequired: 'Enter phone number',
   //    surname: 'Enter surname', 
   //    dob: 'Select dob',
   //    phone: 'Enter phone number' , 
   //    required: 'Enter email',
   //    gender: 'Male or Female',
   //    maritalStatus: 'Are you single, married or divorced',
   //    states: 'Select a state',
   //    location: 'Enter Location',
   //    selectionRequired: 'Make Selection'
   // } 

   // Constraints: 2MB Max (2 * 1024 * 1024), only PDFs and PNGs
   private readonly MAX_SIZE = 2097152; 
   private readonly ALLOWED_EXT = ['jpeg', 'jpg', 'png'];
   // private readonly ALLOWED_EXT = ['png'];
    
    registerForm: FormGroup;

    constructor(private saniter: DomSanitizer, private store: Store<AppState>, private fb: FormBuilder) 
    { 
       this.registerForm = new FormGroup(
        {
          category: new FormControl('-1', [MakeSelection]),
          firstname: new FormControl('', [FirstnameRequired]),
          surname: new FormControl('', [SurnameRequired]),
          phone: new FormControl('', [PhoneRequired]),
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [PasswordRequired]),
          cPassword: new FormControl('', [ConfirmPasswordRequired]),          
          passportImage: new FormControl(null, fileValidator('passportRequired', this.MAX_SIZE, this.ALLOWED_EXT)),
          ninImage: new FormControl(null, fileValidator('ninRequired', this.MAX_SIZE, this.ALLOWED_EXT))
        })       
    }  

    ngOnInit()
    {
      this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
         // this.isLoading.update((currentValue: boolean) => !currentValue)
         this.isLoading.set(data?.loader?.loading)
       })
       this.store.select(getResponseMessage).subscribe((data) => 
         {
           const { statusCode, msg } = data.response
           this.message = msg
           this.statusCode = statusCode
         }
       )       
    }

    ChangeOnButtonHoverIn()
    {
       this.style = {
         'background-color' : '#776005',
         'color': 'white',
         'padding': '20px'     
       }
    }

    ChangeOnButtonHoverOut()
    {
       this.style = {
          'background-color' : '#be9d18',
          'color': 'black',
          'padding': '20px'   
       } 
    }

    register = async () =>
   {
     this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
     if(this.registerForm.valid)
     {
       const passportDocument: File = this.registerForm.value.passportImage;
       const passport = await this.toBase64(passportDocument)

       const ninDocument: File = this.registerForm.value.ninImage;
       const nin = await this.toBase64(ninDocument)

       of(this.registerForm.value)
       .pipe(delay(1000))
       .subscribe(UserDetail => 
         {   
            console.log("Crazy")
            UserDetail['passport'] = passport
            UserDetail['nin'] = nin

            console.log(UserDetail)
            const firstname: string = UserDetail['firstname']!                
            const surname: string  = UserDetail['surname']!  
            const phone: string  = UserDetail['phone']!    
            const email: string  = UserDetail['email']!    
            const password: string  = UserDetail['password']!
            const cPassword: string  = UserDetail['cPassword']!
            const category: string  = UserDetail['category']!
            const ninImage: string = this.base64NinImage?.toString()!
            const passportImage: string = this.base64PassportImage?.toString()!
            console.log("Done")
            // this.store.dispatch(START_REGISTER({ firstname, surname, phone, email, category, password, cPassword, ninImage, passportImage }))
            
            this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))

         }
       )
     } else {
        console.log(this.registerForm.errors)
        console.log("********")
        console.log(this.registerForm.value)
        this.registerForm.markAllAsTouched()
        this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
        //   setTimeout(() => {           
        //     this.store.dispatch(SetLoadingStatus({ loading: false }))
        //   }, 10000)
        this.message = "Attend to all fields"
        this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "user-onboarding"  }))
     }        
   }

   toBase64 = (file: any) => new Promise((resolve, reject) => 
   {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
   })
   
   private convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> 
   {
      return new Promise((resolve, reject) => 
      {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      })
   }
    
     
}
