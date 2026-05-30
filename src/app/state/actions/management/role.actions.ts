import { createAction, props } from "@ngrx/store";
import { ROLE_CREATION, ROLE_CREATION_SUCCESS, ROLE_REMOVAL, ROLE_START, ROLE_UPDATE } from "../../constants/management/role";


export const START_ROLE = createAction(ROLE_START, props<{page: number, limit: number}>())
export const ROLE_SUCCESS = createAction(ROLE_CREATION_SUCCESS, props<{ role: any}>())

export const REMOVE = createAction(ROLE_REMOVAL, props<{ data: any }>())
export const REMOVE_ROLE = createAction(ROLE_REMOVAL, props<{ role: string, page: number, limit: number}>())

// export const RETRIEVE_ROLE = createAction(ROLE_SEARCH_START)
// export const ROLE_SUCCESS = createAction(CATERGORY_SEARCH_SUCCESS, props<{user: any}>())

export const CREATE_ROLE = createAction(ROLE_CREATION, props<{name: string, description: string, page: number, perPage: number}>())
export const UPDATE_ROLE = createAction(ROLE_UPDATE, props<{role: string, name: string, description: string, page: number, perPage: number}>())

