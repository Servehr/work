import { Action, createReducer, on } from "@ngrx/store";
import { START_ROLE, ROLE_SUCCESS } from "../../actions/management/role.actions";

interface IRoleModel 
{
    name: string
    description: string
}

interface IRole 
{
    roles: IRoleModel[]
}

const InitialState: IRole = 
{
    roles: []
}


const _roles = createReducer(InitialState,    
    on(START_ROLE, (state:any, action: any) => 
    {
        return {
            ...state,
            roles: action
        }
    }),
    on(ROLE_SUCCESS, (state: any, action: any) => 
    {
       return {
          ...state,
          roles: action?.role
       }
    }) 
)

export function RoleReducer(state: any, action: Action)
{
    return _roles(state, action)
}