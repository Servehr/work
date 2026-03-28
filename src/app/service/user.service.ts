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
      return this._http.get<any>(`${environment.local}profile/${user}`);
    }

}