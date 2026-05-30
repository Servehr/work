import { createAction, props } from "@ngrx/store";
import { DEPARTMENT_CREATION, DEPARTMENT_CREATION_SUCCESS, DEPARTMENT_REMOVAL, DEPARTMENT_START, DEPARTMENT_UPDATE } from "../../constants/management/department";



export const START_DEPARTMENT = createAction(DEPARTMENT_START, props<{page: number, limit: number}>())
export const DEPARTMENT_SUCCESS = createAction(DEPARTMENT_CREATION_SUCCESS, props<{ departments: any}>())

export const REMOVE = createAction(DEPARTMENT_REMOVAL, props<{ data: any }>())
export const REMOVE_DEPARTMENT = createAction(DEPARTMENT_REMOVAL, props<{department: string, page: number, limit: number}>())

// export const RETRIEVE_DEPARTMENT = createAction(DEPARTMENT_SEARCH_START)
// export const DEPARTMENT_SUCCESS = createAction(DEPARTMENT _SEARCH_SUCCESS, props<{user: any}>())

export const CREATE_DEPARTMENT = createAction(DEPARTMENT_CREATION, props<{name: string, description: string, page: number, perPage: number}>())
export const UPDATE_DEPARTMENT = createAction(DEPARTMENT_UPDATE, props<{ department: string, name: string, description: string, page: number, perPage: number}>())

