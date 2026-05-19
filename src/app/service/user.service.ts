 import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { environment } from "../../environments/environment.development";
import { DatabaseService } from "./db/database.service";

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private _http: HttpClient, private dbService: DatabaseService){}

    profile(user: string) : Observable<any> 
    {
      // const { firstname, surname, phone, email, category} = user
      return this._http.get<any>(`${environment.url}profile/${user}`);
    }

    search(keyword: string) : Observable<any> 
    {
      return this._http.get<any>(`${environment.url}user/${keyword}`);
    }

    newsletter(email: string) : Observable<any> 
    {
      return this._http.post<any>(`${environment.url}user/subscribe`, { email });
    }

}