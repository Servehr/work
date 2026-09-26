import { Component, effect, inject, input, model, output, signal, SimpleChanges } from '@angular/core';
import { WysiwygComponent } from '../../../../../library/wysiwyg/wysiwyg.component';
import { SetErrorMessage, SetLoadingStatus } from '../../../../../state/actions/spinner.action';
import { Store } from '@ngrx/store';
import AppState from '../../../../../state/app.state';
import { CREATE_ABOUT, UPDATE_ABOUT } from '../../../../../state/actions/cms/about.actions';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { fileValidator } from '../../../../auth/register/register.component';
import { ImageUploadComponent } from '../../../../../components/image-upload/image-upload.component';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../../../components/controls/input-field/input-field.component';
import { delay, of } from 'rxjs';
import { TextAreaComponent } from '../../../../../components/controls/text-area/text-area.component';
import { getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';


export const HeaderRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { headerRequired : 'headerRequired' } :  null
}

export const WrietSomethingRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { tellRequired : 'tellRequired' } :  null
}


@Component({
  selector: 'app-write-about',
  standalone: true,
  imports: [WysiwygComponent, ImageUploadComponent, TextAreaComponent, BotinComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './write-about.component.html',
  styleUrl: './write-about.component.scss'
})
export class WriteAboutComponent {

  private store = inject(Store<AppState>)

  isLoading = signal<boolean>(false);
  disabled = signal<boolean>(false)

  about = signal<string>('')  
  aboutus = signal<string>('')  
  title = signal<string>('')
  closeWriteAbout = output<boolean>()

  buttonName = input<string>('Save')  
  content = signal<any>(null) 
  message = signal<string>('')
  dataToUpdate = model<any>(null)
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '20px'
  }

  rows: number = 7
  cols: number = 20

  errorMessages = 
  { 
    tellRequired: 'Write something',
    headerRequired: 'Enter title for write up',
    fileSizeExceeded: 'File maximum upload exceeded',
    invalidExtension: 'Only file types is allowed (png)'  
  }
  
  private readonly MAX_SIZE = 2097152; 
  private readonly ALLOWED_EXT = ['jpeg', 'jpg', 'png'];
  
  aboutForm: FormGroup;  
  
  constructor() 
  { 
    this.dataToUpdate.set(null)
    this.aboutForm = new FormGroup(
    {
      writeHeader: new FormControl('', [HeaderRequired]),         
      writeSomething: new FormControl('', [WrietSomethingRequired]),  
      // aboutImage: new FormControl(null, fileValidator('ninRequired', this.MAX_SIZE, this.ALLOWED_EXT))
    })       
          
    effect(() => 
    {console.log("Hello")
      if(this.dataToUpdate())
      {console.log("May be")
        this.aboutForm.get('writeHeader')?.setValue(this.dataToUpdate()?.data?.title)
        this.aboutForm.get('writeSomething')?.setValue(this.dataToUpdate()?.data?.aboutus)
      } else {
         this.aboutForm.get('writeHeader')?.setValue("")
         this.aboutForm.get('writeSomething')?.setValue("")   
         this.aboutForm.patchValue({
            writeSomething: ''
         });      
         this.dataToUpdate.set(null)
         console.log("Wisdom")
      }
    }, { allowSignalWrites: true })
 } 

  async ngOnInit()
  {    
    console.log("Got here")
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
       if(data?.loader?.page === 'write-about')
       {
         this.aboutForm.get('writeHeader')?.setValue(null)
         this.aboutForm.get('writeSomething')?.setValue(null)   
         this.aboutForm.patchValue({
            writeSomething: ''
         });   
        //  this.aboutForm.get('writeHeader')?.setValue("")
        //  this.aboutForm.get('writeSomething')?.setValue("")
        // Clears all fields and validation flags
         this.dataToUpdate.set(null)
         this.aboutForm.reset();
         this.aboutForm.markAsPristine()
         this.isLoading.set(false)
         this.closeWriteAbout.emit(false)
       }
       console.log("Talk to me")
    }) 
  } 

  contentData = (data: any) => 
  {
    this.content.set(data)
  }

  ngOnChanges(changes: SimpleChanges)
   {
     if(changes['dataToUpdate'])
     {
       console.log("Wetin")
       this.about.set(this.dataToUpdate()?.data?._id)
     } else {
         this.aboutForm.get('writeHeader')?.setValue("")
         this.aboutForm.get('writeSomething')?.setValue("")
         this.dataToUpdate.set(null)
         console.log("Greatness")
     }
  }   

  Write = () => 
  {
     this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
     if(this.aboutForm.valid)
     {
       this.isLoading.set(true)
       of(this.aboutForm.value)
       .pipe(delay(2000))
       .subscribe((aboutUs: any) => 
         {   
            this.title.set(aboutUs['writeHeader'])
            this.aboutus.set(aboutUs['writeSomething'])
            // const aboutImage: File = this.aboutForm.value.aboutImage;
            const aboutImage: string[] = []
            if(this.buttonName() === 'Save')
            {
              this.store.dispatch(CREATE_ABOUT({ title: this.title(), aboutus: this.aboutus(), images: aboutImage }))
            } else {
              this.store.dispatch(UPDATE_ABOUT({ about: this.about(), title: this.title(), aboutus: this.aboutus(),  images: aboutImage }))
            }
            // this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         }
       )
     } else {
        this.isLoading.set(false)
        console.log(this.aboutForm.value)
        this.aboutForm.markAllAsTouched()
        this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
        this.message.set("Attend to all fields")
        // this.store.dispatch(SetErrorMessage({ msg: this.message(), statusCode: 400, operation: "user-onboarding"  }))
     } 
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

}
