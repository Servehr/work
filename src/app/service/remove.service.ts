 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { delay } from 'rxjs/operators';
import { environment } from "../../environments/environment.development";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root"
})
export class RemoveService {

    constructor(private _http: HttpClient){} 
    
    remove(path: string, value: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}${path}`, { value })
    }

}