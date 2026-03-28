 import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { first, firstValueFrom, from, map, mergeMap, Observable, of, switchMap, tap } from "rxjs"
import { IAppResponse } from "../state/interface/IAppResponse";
import { environment } from "../../environments/environment.development";
import { AuthResponse } from "../state/response/AuthResponse";
import { DatabaseService } from "./db/database.service";
import { Store } from "@ngrx/store";
import AppState from "../state/app.state";
import { Router } from "@angular/router";
import { getUserToken } from "../state/selectors/auth.selector";


type PromisReturnedValue = Awaited<Promise<String>>

@Injectable({
    providedIn: "root"
})
export class AuthService {

    _http = inject(HttpClient)
    dbService = inject(DatabaseService)
    store = inject(Store<AppState>)
    router = inject(Router)
    
    UserToken: string = ''

    // constructor(private _http: HttpClient, private dbService: DatabaseService){}

    register(firstname: string, surname: string, phone: string, email: string, category: string, password: string, cPassword: string, ninImage: string, passportImage: string) : Observable<IAppResponse> {
        // const { firstname, surname, phone, email, category} = user
        return this._http.post<IAppResponse>(`${environment.local}auth/register`, { firstname, surname, phone, email, category, password, cPassword, ninImage, passportImage });
    }

    login(email: string, password: string) : Observable<IAppResponse> {
        return this._http.post<IAppResponse>(`${environment.local}auth/login`, { email, password });
    }

    formatUserResponse(message: string, user: { id: string, firstname: string, surname: string, token: string})
    {
       const { id, firstname, surname, token } = user
       const InSession: { userId: string, firstname: string, surname: string, token: string } = { userId: id, firstname: firstname, surname: surname, token: token }
       this.persistUser(InSession)
       return new AuthResponse(message, firstname, surname, token)
    }
    
    persistUser = async (InSession: { userId: string, firstname: string, surname: string, token: string }) =>
    {console.log(InSession)
       await this.dbService.newUser(InSession)   
    }
    
    IsUserInSession =  async () : Promise<string> =>
    {
       let user: any =  await this.dbService.getUser()
       return user[0]?.token
    }

    DoesUserExist =  async () : Promise<string> =>
    {
       let user: any =  await this.dbService.getUser()
       return user[0]?.token
    }

    
    isUnAuthenticated$(): Observable<any>
    {
        return from(this.IsUserInSession())
               .pipe(
                 tap((token) => {
                    return token
                 })
               )
    }

    isAdmin(): boolean 
    {
       return true
    }

    forgot(email: string) : Observable<IAppResponse> {
        return this._http.post<IAppResponse>(`${environment.local}auth/forgot`, { email });
    }

    resetPassword(user: string, password: string, cPassword: string) : Observable<IAppResponse> {
        return this._http.post<IAppResponse>(`${environment.local}auth/reset-password`, { user, password, cPassword });
    }

    signOut = async () => 
    {
      await this.dbService.removeUser()
      this.router.navigate(['auth/login'])
    }

    logOut() : Observable<string>{
        return this._http.post<string>(`${environment.local}auth/logout`, {  })
    }

}