import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IFileHandler } from '../../interface/FileHandler';
import { DomSanitizer } from '@angular/platform-browser';
import { reduceImageSize } from '../../util/image';

@Directive({
  selector: '[appDragDrop]',
  standalone: true
})
export class DragDropDirective {

  imageUploads: any[] = []
  multiplePreview: any[] = []

  @Output() dropFile: EventEmitter<IFileHandler> = new EventEmitter()

  @HostBinding("style.background") private background = "#eee"

  @Input() uploadType: string = 'single'

  constructor(private saniter: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(event: DragEvent)
  {
     event.preventDefault()
     event.stopPropagation()
     this.background = "#999"
  }

  @HostListener("dragLeave", ["$event"])
  public onDragLeave(event: DragEvent)
  {
     event.preventDefault()
     event.stopPropagation()
     this.background = "#eee"
  }

  @HostListener("drop", ["$event"])
  public async onDrop(event: DragEvent)
  {
    event.preventDefault()
    event.stopPropagation()
    this.background = "#eee"
     
    let fileHandler: IFileHandler

    if(this.uploadType === 'multiple')
    {          
       const files = Array.from(event?.dataTransfer?.files!)
       for (let index = 0; index < files.length; index++) 
       {
          let element: any = files?.[index]
          let urlFile = window.URL.createObjectURL(element)
           this.multiplePreview.push(urlFile)
       }

       Promise.all(
         files?.map((file: any) => 
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
            fileHandler = { file: files, url: this.multiplePreview, base64: this.imageUploads }
            console.log(fileHandler?.file)
            this.dropFile.emit(fileHandler)
         })
     } 
     
     if(this.uploadType === 'single')
     {
       const file = event?.dataTransfer?.files[0]!
       const imageString = await this.toBase64(file)
       const base64Image: any = imageString
         
       const url = this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file))

       const baseImage64: unknown | string = await reduceImageSize(base64Image)
       const base64 = baseImage64?.toString()!
         
       fileHandler = { file, url, base64 }
       this.dropFile.emit(fileHandler)
     }    
  }

  toBase64 = (file: any) => new Promise((resolve, reject) => 
  {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
  })

}
