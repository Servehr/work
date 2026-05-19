 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class CategoryService {

    constructor(private _http: HttpClient){}

    categories(page?: number, limit?: number) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}category?page=${page}&limit=${limit}`);
    }
    
    create(name: string, description: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}category/create`, { name: name, description: description });
    }

    update(category: string, name: string, description: string) : Observable<any> 
    {console.log("Hello")
      return this._http.put<{category: string, name: string, description: string}>(`${environment.url}category/update`, { category: category, name: name, description: description });
    }    
}