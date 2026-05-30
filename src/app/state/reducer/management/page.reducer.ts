import { Action, createReducer, on } from "@ngrx/store";
import { PAGE_SUCCESS, START_PAGE } from "../../actions/management/page.actions";

interface IPageModel 
{
    name: string
    description: string
}

interface IPage 
{
    pages: IPageModel[]
}

const InitialState: IPage = 
{
    pages: []
}


const _page = createReducer(InitialState,    
    on(START_PAGE, (state:any, action: any) => 
    {
       return {
         ...state,
         pages: action
       }
    }),
    on(PAGE_SUCCESS, (state: any, action: any) => 
    {
       return {
         ...state,
         pages: action?.pages
       }
    }) 
)

export function PageReducer(state: any, action: Action)
{
    return _page(state, action)
}