import { createAction, props } from "@ngrx/store";
import { REXOURCE_CREATION, REXOURCE_CREATION_SUCCESS, REXOURCE_REMOVAL, REXOURCE_START, REXOURCE_UPDATE } from "../../constants/management/rexource";



export const START_REXOURCE = createAction(REXOURCE_START, props<{page: number, limit: number}>())
export const REXOURCE_SUCCESS = createAction(REXOURCE_CREATION_SUCCESS, props<{ rexources: any}>())

export const REMOVE = createAction(REXOURCE_REMOVAL, props<{ data: any }>())
export const REMOVE_REXOURCE = createAction(REXOURCE_REMOVAL, props<{rexource: string, page: number, limit: number}>())

export const CREATE_REXOURCE = createAction(REXOURCE_CREATION, props<{name: string, description: string, page: number, perPage: number}>())
export const UPDATE_REXOURCE = createAction(REXOURCE_UPDATE, props<{ rexource: string, name: string, description: string, page: number, perPage: number}>())

