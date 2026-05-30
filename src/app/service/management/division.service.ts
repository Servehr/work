 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class DivisionService {

    constructor(private _http: HttpClient){}

    divisions(category: string, page?: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}division/category?category=${category}&page=${page}&limit=${limit}`);
    }
    
    create(category: string, name: string, description: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}division/create`, { category: category, name: name, description: description });
    }

    update(division: string, name: string, description: string) : Observable<any> 
    {
      return this._http.put<{division: string, name: string, description: string}>(`${environment.url}division/update`, { division: division, name: name, description: description });
    }   
    
    remove(value: string) : Observable<any> 
    {
      return this._http.put<any>(`${environment.url}division/remove`, { division: value })
    }  
}