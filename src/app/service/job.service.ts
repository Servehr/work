 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class JobService {

    constructor(private _http: HttpClient){}

    suggestions(url: string) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}${url}`);
    }

    postJob(job: any) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}category`);
    }

}