 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class AboutService {

    constructor(private _http: HttpClient){}

    about() : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}about`);
    }
    
    create(title: string, aboutus: string, image: string[]) : Observable<any> 
    {
      console.log('Creating')
      return this._http.post<any>(`${environment.url}about/create`, { title, aboutus, image });
    }

    update(about: string, title: string, aboutus: string, image: string[]) : Observable<any> 
    {
      return this._http.put<{about: string, aboutus: string}>(`${environment.url}about/update`, { about, title, aboutus, image });
    }

    remove(about: string) : Observable<any> 
    {
      return this._http.post<{about: string}>(`${environment.url}about/remove`, { about });
    }
}