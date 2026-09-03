import { Component, EventEmitter, forwardRef, inject, Input, Output, signal } from '@angular/core';
import { DragDropDirective } from '../../directives/drag-and-drop/drag-drop.directive';
import { ImageComponent } from '../controls/image/image.component';
import { NgIcon } from '@ng-icons/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { InputFileValidationComponent } from '../../validations/input-file-validation/input-file-validation.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IFileHandler } from '../../interface/FileHandler';
import { InputFileValueAcessorDirective } from '../../directives/input-file/input-file-value-acessor.directive';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [InputFileValidationComponent, DragDropDirective, NgIf, ImageComponent, NgIcon, ReactiveFormsModule, CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent<T> extends InputFileValueAcessorDirective<T> {

  
  isDragOver = false;

  saniter = inject(DomSanitizer)

  @Input() customErrorMessages: Record<string, string> = { }

  async base64ToFileUsingFetch (base64String: string, filename: string): Promise<File> 
  {
    // Fetch the data URL directly
    const response = await fetch(base64String);
    // Convert the response into a binary Blob
    const blob = await response.blob();
    // Return the constructed File object
    return new File([blob], filename, { type: 'image/jpg' });
  }


  // ++++++++++++++++++++++++++++++++++++++++++++
  dropFile = async (upload: IFileHandler, type: string) => 
  {
      // console.log(upload?.url)
      this.previewUrl = upload.url;
      
      const now: Date = new Date();
      const isoString: string = now.toISOString();
      const file = await this.base64ToFileUsingFetch(String(this.previewUrl), isoString)
      this.onChange(file)
      // const SafeUrlToFileObject = await this.safeUrlToFile(upload?.url, 'uploadImage')
      // const base64 = await this.toBase64(SafeUrlToFileObject);
      // this.convertFileToBase64(SafeUrlToFileObject).then(base64 => 
      // {
      //   if(type === 'nin')
      //   {
      //     // this.NIN = []
      //     // this.NIN.push(upload?.url)
      //     // this.base64NinImage = base64
      //   }

      //   if(type === 'passport')
      //   {
      //     // this.passportPhotograph = []
      //     // this.passportPhotograph.push(upload?.url)
      //     // this.base64PassportImage = base64
      //   }
      // }).catch(error => {
      //    console.error('Error converting file:', error);
      // })
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
        //  console.log(file)
        //  console.log(reader.result)
         reader.onload = () => resolve(reader.result)
         reader.onerror = (error) => reject(error)
      })
  }

  async safeUrlToFile(safeUrl: SafeUrl, fileName: string): Promise<File> 
   {
      // 1. Unwrap the SafeUrl to get raw string
      const rawUrl = this.saniter.sanitize(0, safeUrl) || ''
      // console.log(rawUrl)
      
      // 2. Fetch the URL as a blob
      const response = await fetch(rawUrl);
      // console.log(response)
      const blob = await response.blob();
      // console.log(blob)
      
      // 3. Create file from blob
      return new File([blob], fileName, { type: 'image/jpeg' });
  }   

  // onFileSelected(event: Event) 
  // {
  //    const element = event.currentTarget as HTMLInputElement;
  //    const fileList: FileList | null = element.files;
  //    console.log(fileList)
  //    if (fileList && fileList.length > 0) 
  //    {
  //     //  this.file = fileList[0];
  //     //  this.onChange(this.file); // Notifies Angular of the new value
  //    }
  // }
  
  

}