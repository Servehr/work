import { Action, createReducer, on } from "@ngrx/store";
import { PAGE_AKTION_SUCCESS, START_AKTION } from "../../actions/management/aktion.actions";
import { AKTION_START_SUCCESS } from "../../actions/management/page.actions";

interface IAktionModel 
{
    name: string
    description: string
}

interface IAktion 
{
    aktions: IAktionModel[]
}

const InitialState: IAktion = 
{
    aktions: []
}


const _aktion = createReducer(InitialState,    
    on(START_AKTION, (state:any, action: any) => 
    {
       return {
         ...state,
         aktions: action
       }
    }),
    on(PAGE_AKTION_SUCCESS, (state: any, action: any) => 
    {console.log(action)
       return {
         ...state,
         aktions: action?.pages
       }
    }),
    on(AKTION_START_SUCCESS, (state: any, action: any) => 
    {console.log(action)
       return {
         ...state,
         aktions: action?.page_actions
       }
    }) 
)

export function AktionReducer(state: any, action: Action)
{
    return _aktion(state, action)
}