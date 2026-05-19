import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ImageComponent } from '../../../components/controls/image/image.component';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { DragDropDirective } from '../../../directives/drag-and-drop/drag-drop.directive';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IFileHandler } from '../../../interface/FileHandler';
import { getSpinnerStatus, getResponseMessage } from '../../../state/selectors/spinner.selector';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { ImageUploadComponent } from '../../../components/image-upload/image-upload.component';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ImageComponent, DragDropDirective, NgIcon, NgStyle, ImageUploadComponent, BotinComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  imageStyle: any = {
    'border-radius' : '20%'
  }

  @Input()
  height: number = 400

  @Input()
  width: number = 400
  
  @Input()
  alt: string = 'company-logo'
 
  @Input()
  src: string = '../../../../../man.jpg'

  @Input() title: string = ''
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter() 

  style = {
    'padding' : '5px 10px 5px 10px'
  }

  isLoading = signal(false);
  value: string = '-1'
  disabled: boolean = false
  ChangeOnHover: boolean = false
  message: string = ''
  statusCode!: number
  NIN: any[] = []
  passportPhotograph: any[] = []
  deleteIcon: any = bootstrapTrash

  base64NinImage: string | ArrayBuffer | null = null
  base64PassportImage: string | ArrayBuffer | null = null

  constructor(private saniter: DomSanitizer, private store: Store<AppState>) {}  

//   data: { status: boolean, statusCode: number }

  ngOnInit()
  {
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      const status = data?.status
      this.isLoading.update((currentValue: boolean) => status)
    })
    this.store.select(getResponseMessage).subscribe((data) => 
    {
      const { statusCode, msg } = data.response
      this.message = msg
      this.statusCode = statusCode
    })       
  }

  onFileSelectedChange = (event: any, type: string) =>
  {
      const file: any = event?.target?.files[0]
      
      const fileHandler: IFileHandler = {
         file: file,
         url: this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
         base64: ''
      }
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
      console.log(rawUrl)
      
      // 2. Fetch the URL as a blob
      const response = await fetch(rawUrl);
      console.log(response)
      const blob = await response.blob();
      console.log(blob)
      
      // 3. Create file from blob
      return new File([blob], fileName, { type: 'image/jpeg' });
   }  

   saveFile(data: any, type: string)
   {

   }

   closeModal = () => 
   {

   }

}
