import { createAction, props } from "@ngrx/store";
import { RESOURCES_PAGES_ACTIONS, RESOURCES_UNDER_ROLE, REXOURCE_CONNECTION, REXOURCE_CREATION, REXOURCE_CREATION_SUCCESS, REXOURCE_DISCONNECTION, REXOURCE_REMOVAL, REXOURCE_START, REXOURCE_UPDATE } from "../../constants/management/rexource";



export const START_REXOURCE = createAction(REXOURCE_START, props<{page: number, limit: number}>())
export const REXOURCE_SUCCESS = createAction(REXOURCE_CREATION_SUCCESS, props<{ rexources: any}>())

export const REMOVE = createAction(REXOURCE_REMOVAL, props<{ data: any }>())
export const REMOVE_REXOURCE = createAction(REXOURCE_REMOVAL, props<{rexource: string, page: number, limit: number}>())

export const CREATE_REXOURCE = createAction(REXOURCE_CREATION, props<{name: string, description: string, page: number, perPage: number}>())
export const UPDATE_REXOURCE = createAction(REXOURCE_UPDATE, props<{ rexource: string, name: string, description: string, page: number, perPage: number}>())

export const CONNECT_REXOURCE = createAction(REXOURCE_CONNECTION, props<{ role: string, rexource: string }>())
export const DISCONNECT_REXOURCE = createAction(REXOURCE_DISCONNECTION, props<{ role: string, rexource: string }>())

export const ROLE_RESOURCES = createAction(RESOURCES_UNDER_ROLE, props<{ role: string }>())

export const START_REXOURCE_PAGES_ACTIONS = createAction(RESOURCES_PAGES_ACTIONS, props<{ role: string, rexource: string }>())

