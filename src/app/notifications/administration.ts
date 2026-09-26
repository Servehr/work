import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdministrationService {
 
   private dataSubject = new Subject<any>();
   
   data$ = this.dataSubject.asObservable();

   emitData(data: any, condition: string) 
   {
     this.dataSubject.next({data, condition});
   }
   
}
