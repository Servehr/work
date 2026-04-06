import { Component, EventEmitter, Output, signal } from '@angular/core';
import { DragDropDirective } from '../../directives/drag-and-drop/drag-drop.directive';
import { ImageComponent } from '../controls/image/image.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IFileHandler } from '../../interface/FileHandler';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { reduceImageSize } from '../../util/image';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [DragDropDirective, ImageComponent, NgIcon],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {

  imageUpload: any[] = []
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
  
  @Output() sendFile: EventEmitter<string> = new EventEmitter()
  
  constructor(private saniter: DomSanitizer, private store: Store<AppState>){} 

  onFileSelectedChange = async (event: any) =>
  {
    const file: any = event?.target?.files[0]

    const imageString = await this.toBase64(file)
    const base64Image: any = imageString
    
    const baseImage64: unknown | string = await reduceImageSize(base64Image)
    const base64 = baseImage64?.toString()!
      
    const fileHandler: IFileHandler = 
    {
      file: file,
      url: this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
      base64: base64
    }
    this.imageUpload = []
    this.imageUpload.push(fileHandler?.url)
    this.sendFile.emit(fileHandler?.base64)
  }
  
  removeImages = (remove: string) =>
  {
    this.imageUpload = []
    return false
  }
     
  dropFile = async (upload: IFileHandler) => 
  {
    const SafeUrlToFileObject = await this.safeUrlToFile(upload?.url, 'uploadImage')
    const base64 = await this.toBase64(SafeUrlToFileObject)
  
    this.convertFileToBase64(SafeUrlToFileObject).then(base64 => 
    {
      this.imageUpload = []
      this.imageUpload.push(upload?.url)
      this.sendFile.emit(upload?.base64)
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
