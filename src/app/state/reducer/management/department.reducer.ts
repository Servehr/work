import { Action, createReducer, on } from "@ngrx/store";
import { DEPARTMENT_SUCCESS, START_DEPARTMENT } from "../../actions/management/department.actions";

interface IDepartmentModel 
{
    name: string
    description: string
}

interface IDepartment 
{
    departments: IDepartmentModel[]
}

const InitialState: IDepartment = 
{
    departments: []
}


const _department = createReducer(InitialState,    
    on(START_DEPARTMENT, (state:any, action: any) => 
    {
        return {
            ...state,
            departments: action
        }
    }),
    on(DEPARTMENT_SUCCESS, (state: any, action: any) => 
    {
       return {
          ...state,
          departments: action?.departments
       }
    }) 
)

export function DepartmentReducer(state: any, action: Action)
{
    return _department(state, action)
}