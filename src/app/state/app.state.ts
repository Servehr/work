import { AuthResponse } from "./response/AuthResponse";
import { Spinner } from "./models/spinner.model";
import { Msg } from "./models/msg";
import { AuthReducer } from "./reducer/auth.reducer";
import { spinReducer } from "./reducer/spinner.reducer";
import { MessageReducer } from "./reducer/message.reducer";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { UserResponse } from "./response/UserResponse";
import { userReducer } from "./reducer/user.reducer";


export default interface AppState 
{
   router: RouterReducerState<any>
   auth: AuthResponse
   loading: Spinner
   msg: Msg
   profile: UserResponse
}


export const AppReducer = 
{
   router: routerReducer,
   authState: AuthReducer,
   spinState: spinReducer,
   msgState: MessageReducer,
   userState: userReducer
}