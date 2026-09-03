import { Action, createReducer, on } from "@ngrx/store";
import { ABOUT_SUCCESS, START_ABOUT } from "../../actions/cms/about.actions";

interface IAboutUsModel 
{
    aboutus: any
}

const InitialState: IAboutUsModel = 
{
    aboutus: null
}


const _aboutus = createReducer(InitialState,    
    on(START_ABOUT, (state:any, action: any) => 
    {
        return {
          ...state,
          aboutus: action
        }
    }),
    on(ABOUT_SUCCESS, (state: any, action: any) => 
    {
       return {
          ...state,
          aboutus: action
       }
    }) 
)

export function AboutReducer(state: any, action: Action)
{
    return _aboutus(state, action)
}