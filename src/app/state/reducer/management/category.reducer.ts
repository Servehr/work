import { Action, createReducer, on } from "@ngrx/store";
import { CATEGORY_SUCCESS, START_CATEGORY } from "../../actions/management/category.actions";

interface ICategModel 
{
    name: string
    description: string
}

interface ICategory 
{
    category: ICategModel[]
}

const InitialState: ICategory = 
{
    category: []
}

////
// export const InitialState: ISpinnerState = {
//     loader: {
//         loading: false,
//         statusCode: 0
//     }
// }

// export interface ISpinnerState 
// {
//     loader: {
//         loading: boolean
//         statusCode: number
//     }
// }
/////////////

const _category = createReducer(InitialState,    
    on(START_CATEGORY, (state:any, action: any) => {
        console.log(action)
        return {
            ...state,
            category: action
        }
    }),
    on(CATEGORY_SUCCESS, (state: any, action: any) => 
    {
        return {
            ...state,
            category: action?.category
        }
    }) 
)

export function CategoryReducer(state: any, action: Action)
{
    return _category(state, action)
}