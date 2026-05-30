 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class PageService {

    constructor(private _http: HttpClient){}

    pages(page?: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}page?page=${page}&limit=${limit}`);
    }
    
    create(name: string, description: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}page/create`, { name: name, description: description });
    }

    update(page: string, name: string, description: string) : Observable<any> 
    {
      return this._http.put<{page: string, name: string, description: string}>(`${environment.url}page/update`, { page: page, name: name, description: description });
    } 
    
    remove(value: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}page/remove`, { page: value })
    }    

    connectPageToResource(rexource: string, pages: string) : Observable<any>
    {
      return this._http.put<any>(`${environment.url}page/connect-page-to-resource`, { rexource, pages: [pages] })
    }
}