import { Action, createReducer, on } from "@ngrx/store";
import { DIVISION_SUCCESS, LOAD_DIVISIONS } from "../../actions/management/division.actions.";

interface IDivisiongModel 
{
    name: string
    description: string
}

interface IDivision 
{
    divisions: IDivisiongModel[]
}

const InitialState: IDivision = 
{
    divisions: []
}


const _divisions = createReducer(InitialState,    
    on(LOAD_DIVISIONS, (state:any, action: any) => 
    {
        return {
            ...state,
            divisions: action
        }
    }),
    on(DIVISION_SUCCESS, (state: any, action: any) => 
    {
       return {
          ...state,
          divisions: action?.division
       }
    }) 
)

export function DivisionReducer(state: any, action: Action)
{
    return _divisions(state, action)
}