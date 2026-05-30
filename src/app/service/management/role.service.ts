 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class RoleService {

    constructor(private _http: HttpClient){}

    roles(page?: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}role?page=${page}&limit=${limit}`);
    }
    
    create(name: string, description: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}role/create`, { name: name, description: description });
    }

    update(role: string, name: string, description: string) : Observable<any> 
    {
      return this._http.put<{role: string, name: string, description: string}>(`${environment.url}role/update`, { role: role, name: name, description: description });
    } 
    
    remove(value: string) : Observable<any> 
    {console.log(value)
      return this._http.put<any>(`${environment.url}role/remove`, { role: value })
    }    
}