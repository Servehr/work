import { SafeUrl } from "@angular/platform-browser"

export interface IFileHandler 
{
   file: any //File | File[]
   url: any //SafeUrl
   path?: { changingThisBreaksApplicationSecurity: string }
   base64: any // string | string[]
}