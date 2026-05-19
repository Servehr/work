import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
             RouterModule, InputFieldValidationComponent, ReactiveFormsModule, InputFieldComponent, InputFileComponent,
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
    
   categories:{ id: string, name: string }[] = 
   [
      { id: 'technician', name:'Technician' },
      { id: 'apprenticeship', name:'TVet appretenship' },
      { id: 'vendor', name:'Vendor' },
      { id: 'agent', name:'Agent' },
      { id: 'partner', name:'Partners' }
   ]
    
   plans:{ id: string, name: string }[] = 
   [
      { id: 'free', name:'Free' },
      { id: 'Basic', name:'Basic' },
      { id: 'Plus', name:'Plus' },
      { id: 'premium', name:'Premium' },
      { id: 'gold', name:'Gold' }
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
      confirmPasswordRequired: 'Password do not match'
   } 

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
    
    registerForm: FormGroup;

    constructor(private saniter: DomSanitizer, private store: Store<AppState>) 
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
         //  myFile: new FormControl('', [Validators.required]),
         //  nin: new FormControl('', [Validators.required]),
         //  plan: new FormControl('', [Validators.required]),
        }
       )
    }   

    ngOnInit()
    {
      this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
         this.isLoading.update((currentValue: boolean) => !currentValue)
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

    register = () =>
   {
     this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
     if(this.registerForm.valid)
     {
       of(this.registerForm.value)
       .pipe(delay(1000))
       .subscribe(UserDetail => 
         {  
            // const data: any = 
            // {
            //    firstname: UserDetail['firstname']!,                 
            //    surname: UserDetail['surname']!,  
            //    phone: UserDetail['phone']!,    
            //    email: UserDetail['email']!,    
            //    cpassword: UserDetail['cpassword']!,
            //    password: UserDetail['password']!,
            // }  
            console.log("Crazy")
            const firstname: string = UserDetail['firstname']!                
            const surname: string  = UserDetail['surname']!  
            const phone: string  = UserDetail['phone']!    
            const email: string  = UserDetail['email']!    
            const password: string  = UserDetail['password']!
            const cPassword: string  = UserDetail['cPassword']!
            const category: string  = UserDetail['category']!
            const ninImage: string = this.base64NinImage?.toString()!
            const passportImage: string = this.base64PassportImage?.toString()!
            this.store.dispatch(START_REGISTER({ firstname, surname, phone, email, category, password, cPassword, ninImage, passportImage }))
         }
       )
     } else {
        this.registerForm.markAllAsTouched()
        this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
        //   setTimeout(() => {           
        //     this.store.dispatch(SetLoadingStatus({ loading: false }))
        //   }, 10000)
        this.message = "Attend to all fields"
        this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "user-onboarding"  }))
     }        
    }

    onFileSelectedChange = async (event: any, type: string) =>
   {
      const file: any = event?.target?.files[0]
      
      const fileHandler: IFileHandler = {
         file: file,
         url: this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
         base64: ''
      }

      const url = this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file))

      console.log(fileHandler.url)
      if(type === 'nin')
      {
        this.NIN = []
        this.NIN.push(fileHandler?.url)
      }

      if(type === 'passport')
      {
        this.passportPhotograph = []
        this.passportPhotograph.push(fileHandler?.url)
      }
    }

    removeImages = (remove: string) =>
   {
      if(remove === 'nin')
      {
         this.NIN = []
      }
      if(remove === 'passport')
      {
         this.passportPhotograph = []
      }
    }
   
    dropFile = async (upload: IFileHandler, type: string) => 
   {
      console.log(upload?.url)
      const SafeUrlToFileObject = await this.safeUrlToFile(upload?.url, 'uploadImage')
      console.log(SafeUrlToFileObject)
      const base64 = await this.toBase64(SafeUrlToFileObject);
      console.log(base64)
      console.log(typeof SafeUrlToFileObject)

      this.convertFileToBase64(SafeUrlToFileObject).then(base64 => 
      {
         console.log(base64)
        if(type === 'nin')
        {
          this.NIN = []
          this.NIN.push(upload?.url)
          this.base64NinImage = base64
        }

        if(type === 'passport')
        {
          this.passportPhotograph = []
          this.passportPhotograph.push(upload?.url)
          this.base64PassportImage = base64
        }
      }).catch(error => {
         console.error('Error converting file:', error);
      })
    }

    toBase64 = (file: any) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })

    private convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> 
   {
      return new Promise((resolve, reject) => 
      {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         console.log(file)
         console.log(reader.result)
         reader.onload = () => resolve(reader.result)
         reader.onerror = (error) => reject(error)
      })
    }

    async safeUrlToFile(safeUrl: SafeUrl, fileName: string): Promise<File> 
   {
      // 1. Unwrap the SafeUrl to get raw string
      const rawUrl = this.saniter.sanitize(0, safeUrl) || ''
      
      // 2. Fetch the URL as a blob
      const response = await fetch(rawUrl);
      console.log(response)
      const blob = await response.blob();
      console.log(blob)
      
      // 3. Create file from blob
      return new File([blob], fileName, { type: 'image/jpeg' });
    }

    saveFile(fileToSave: string, type: string)
    {
      console.log({ fileToSave, type })
    }
    
     
}
