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

    linkResource(role: string, resource: string) : Observable<any> 
    {
      return this._http.put<{role: string, resource: string}>(`${environment.url}role/resource-unlink`, { role: role, resource: resource });
    } 
    
    remove(value: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}role/remove`, { role: value })
    } 
    
    connectResourceToRole(role: string, rexource: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}role/resource-link`, { role, rexource })
    }  
    
    disconnectResourceFromRole(role: string, rexource: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}role/resource-unlink`, { role, rexource })
    }  
    
    roleResources(role: string) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}role/resources?role=${role}`)
    }    
    
}