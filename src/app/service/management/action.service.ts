 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class AktionService {

    constructor(private _http: HttpClient){}

    actions(pagee: number, limit: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}action?page=${pagee}&limit=${limit}`);
    }

    pageActions(page: string, pagee: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}page?page=${page}&limit=${limit}`);
    }
    
    create(page: string, name: string, description: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}action/create`, { page: page, name: name, description: description });
    }

    update(action: string, name: string, description: string) : Observable<any> 
    {
      return this._http.put<{action: string, name: string, description: string}>(`${environment.url}action/update`, { action: action, name: name, description: description });
    } 
    
    remove(page: string, action: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}action/remove`, { page: page, action: action })
    }
    
    permission(role: string, rexource: string, page: string, action: any, status: boolean) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}action/permission`, { role: role, rexource: rexource, page: page, action: action, status: status })
    } 
}