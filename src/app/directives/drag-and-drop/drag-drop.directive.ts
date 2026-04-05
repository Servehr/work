import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { IFileHandler } from '../../interface/FileHandler';
import { DomSanitizer } from '@angular/platform-browser';
import { reduceImageSize } from '../../util/image';

@Directive({
  selector: '[appDragDrop]',
  standalone: true
})
export class DragDropDirective {

  @Output() dropFile: EventEmitter<IFileHandler> = new EventEmitter()

  @HostBinding("style.background") private background = "#eee"

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
//   public async onDrop(event: DragEvent)
//   {
//      event.preventDefault()
//      event.stopPropagation()
//      this.background = "#eee"
     
//      let fileHandler: IFileHandler
//      const file = event?.dataTransfer?.files[0]!
//      const imageString = await this.toBase64(file)
//      const base64: any = imageString
//      console.log(base64)
//      console.log(typeof base64)
//      const url = this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
     
//      console.log("Calling One")
//      fileHandler = { file, url, base64 }
//      this.dropFile.emit(fileHandler)     
//   }

  public async onDrop(event: DragEvent)
  {
     event.preventDefault()
     event.stopPropagation()
     this.background = "#eee"
     
     let fileHandler: IFileHandler
     const files = event?.dataTransfer?.files!
     let fileCount = files?.length
     if(fileCount > 1)
     {
       console.log("Great")
     } else {
        const file = event?.dataTransfer?.files[0]!
        console.log("One One")
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
