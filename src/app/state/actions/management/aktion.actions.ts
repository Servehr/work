import { createAction, props } from "@ngrx/store";
import { PAGE_AKTION_START, AKTION_CREATION_SUCCESS, AKTION_REMOVAL, AKTION_CREATION, AKTION_UPDATE, AKTION_START, GRANT_REVOKE } from "../../constants/management/aktion";


export const START_AKTION = createAction(AKTION_START, props<{ pagee: number, limit: number}>())

export const START_PAGE_AKTION = createAction(PAGE_AKTION_START, props<{ page?: string, pagee: number, limit: number}>())
export const PAGE_AKTION_SUCCESS = createAction(AKTION_CREATION_SUCCESS, props<{ actions: any}>())


export const REMOVE = createAction(AKTION_REMOVAL, props<{ data: any }>())
export const REMOVE_AKTION = createAction(AKTION_REMOVAL, props<{ page: string, action: string }>())

export const CREATE_AKTION = createAction(AKTION_CREATION, props<{ pagee: number, limit: number, page: string, name: string, description: string}>())
export const UPDATE_AKTION = createAction(AKTION_UPDATE, props<{ currentPage: string, limit: number, action: string, name: string, description: string }>())

export const PERMISSION = createAction(GRANT_REVOKE, props<{ role: string, rexource: string, page: string, action: any, status: boolean }>())

