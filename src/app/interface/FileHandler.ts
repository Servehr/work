import { SafeUrl } from "@angular/platform-browser"

export interface IFileHandler 
{
   file: File
   url: SafeUrl
   path?: { changingThisBreaksApplicationSecurity: string }
   base64: string
}