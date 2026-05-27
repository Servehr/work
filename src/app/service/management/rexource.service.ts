 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class RexourceService {

    constructor(private _http: HttpClient){}

    rexources(page?: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}rexource?page=${page}&limit=${limit}`);
    }
    
    create(name: string, description: string) : Observable<any> 
    {
      console.log({ name, description })
      return this._http.post<any>(`${environment.url}rexource/create`, { name: name, description: description });
    }

    update(rexource: string, name: string, description: string) : Observable<any> 
    {
      return this._http.put<{rexource: string, name: string, description: string}>(`${environment.url}rexource/update`, { rexource: rexource, name: name, description: description });
    } 
    
    remove(value: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}rexource/remove`, { rexource: value })
    }    
}