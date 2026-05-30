 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class DepartmentService {

    constructor(private _http: HttpClient){}

    departments(page?: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}department?page=${page}&limit=${limit}`);
    }
    
    create(name: string, description: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}department/create`, { name: name, description: description });
    }

    update(department: string, name: string, description: string) : Observable<any> 
    {
      return this._http.put<{department: string, name: string, description: string}>(`${environment.url}department/update`, { department: department, name: name, description: description });
    } 
    
    remove(value: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}department/remove`, { department: value })
    }    
}