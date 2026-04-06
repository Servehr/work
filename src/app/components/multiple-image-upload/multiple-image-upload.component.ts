import { ChangeDetectorRef, Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { DragDropDirective } from '../../directives/drag-and-drop/drag-drop.directive';
import { ImageComponent } from '../controls/image/image.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IFileHandler } from '../../interface/FileHandler';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { reduceImageSize } from '../../util/image';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-multiple-image-upload',
  standalone: true,
  imports: [DragDropDirective, ImageComponent, NgIcon, NgStyle, NgClass],
  templateUrl: './multiple-image-upload.component.html',
  styleUrl: './multiple-image-upload.component.scss'
})
export class MultipleImageUploadComponent {

  imageUploads: any[] = []
  multiplePreview: any[] = []
  images: any[] = []
  previewsUrl: any[] = []
  markMainImage: number = -1
  mainImagePosition: number = -1
  uploadType: string = 'multiple'

  isLoading = signal(false)
  ChangeOnHover: boolean = false
  deleteIcon: any = bootstrapTrash
  
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '20px'
  }
  imageStyle: any = {
    'border-radius' : '20%'
  }
  fontStyle: any = {
    'font-size' : '11px'
  }
  
  @Output() sendFile: EventEmitter<string> = new EventEmitter()
  
  constructor(private saniter: DomSanitizer, private store: Store<AppState>, private cdr: ChangeDetectorRef)
  {
    //  effect(() => {
    //     let imagesToSave: any = []
    //     for (let index = 0; index < this.multiplePreview.length; index++) 
    //     {
    //       if(index === this.mainImagePosition)
    //       {
    //          imagesToSave.push({image: this.multiplePreview[index], position: index, faceImage: this.mainImagePosition})
    //       } else {
    //          imagesToSave.push({image: this.multiplePreview[index], position: index, faceImage: 0})
    //       }
    //     }
    //     console.log({ imagesToSave: imagesToSave, mainImageposition: this.mainImagePosition })
    //  }) 
  } 

  onFileSelectedChange = async (event: any) =>
  {
    const files = Array.from(event.target.files)

    if(files.length > 0) 
    {           

      for (let index = 0; index < files.length; index++) 
      {
        let element: any = files?.[index]
        let urlFile = window.URL.createObjectURL(element)
        this.multiplePreview.push(urlFile)
      }

      Promise.all(
       files.map((file: any) => 
       {
          return new Promise((resolve, reject) => {
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => 
            {                        
              let sizeToCalculate = reader.result as string
              let x = await reduceImageSize(sizeToCalculate)
              resolve(x)
            }
            reader.onerror = (error) => reject(error);
          });
        })
     ).then((results) => {   
      
        for (let index = 0; index < results.length; index++) 
        {
          const element = results[index]        
          this.imageUploads.push(...this.imageUploads, element)
        }
     })
    }
  }
  
  removeImages = (remove: string) =>
  {
    this.imageUploads = []
    return false
  }

  handleDeleteImage = (index: number) => 
  {
    this.multiplePreview.splice(index, 1)
    this.imageUploads.slice(index, 1)

    if(this.mainImagePosition === index)
    {
      this.mainImagePosition = -1
    }
    if(this.mainImagePosition > index)
    {
      this.mainImagePosition = this.mainImagePosition - 1
    }
  }
     
  dropFile = async (upload: IFileHandler) => 
  {
    // const SafeUrlToFileObject = await this.safeUrlToFile(upload?.url, 'uploadImage')
    // const base64 = await this.toBase64(SafeUrlToFileObject)

    console.log(upload?.url)

    this.imageUploads.push(...this.imageUploads)
    // this.imageUploads.push(...this.imageUploads, upload?.base64)
    this.multiplePreview = upload?.url
  
    // this.convertFileToBase64(SafeUrlToFileObject).then(base64 => 
    // {
    //   this.imageUploads = []
    //   this.imageUploads.push(upload?.url)
    //   this.sendFile.emit(upload?.base64)
    // }).catch(error => {
    //     console.error('Error converting file:', error);
    // })
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
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  
  async safeUrlToFile(safeUrl: SafeUrl, fileName: string): Promise<File> 
  {
    // 1. Unwrap the SafeUrl to get raw string
    const rawUrl = this.saniter.sanitize(0, safeUrl) || ''
        
    // 2. Fetch the URL as a blob
    const response = await fetch(rawUrl)
    const blob = await response.blob()
        
    // 3. Create file from blob
    return new File([blob], fileName, { type: 'image/jpeg' });
  }

}
