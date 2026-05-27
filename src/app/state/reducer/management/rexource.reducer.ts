import { Action, createReducer, on } from "@ngrx/store";
import { REXOURCE_SUCCESS, START_REXOURCE } from "../../actions/management/rexource.actions";

interface IRexourceModel 
{
    name: string
    description: string
}

interface IRexource 
{
    rexources: IRexourceModel[]
}

const InitialState: IRexource = 
{
    rexources: []
}


const _rexource = createReducer(InitialState,    
    on(START_REXOURCE, (state:any, action: any) => 
    {
        return {
            ...state,
            departments: action
        }
    }),
    on(REXOURCE_SUCCESS, (state: any, action: any) => 
    {
       return {
          ...state,
          departments: action?.rexources
       }
    }) 
)

export function RexourceReducer(state: any, action: Action)
{
    return _rexource(state, action)
}