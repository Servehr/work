import { createAction, props } from "@ngrx/store";
import { PAGE_START, PAGE_CREATION_SUCCESS, PAGE_REMOVAL, PAGE_CREATION, PAGE_UPDATE, PAGE_TO_RESOURCE } from "../../constants/management/page";



export const START_PAGE = createAction(PAGE_START, props<{page: number, limit: number}>())
export const PAGE_SUCCESS = createAction(PAGE_CREATION_SUCCESS, props<{ pages: any}>())

export const REMOVE = createAction(PAGE_REMOVAL, props<{ data: any }>())
export const REMOVE_PAGE = createAction(PAGE_REMOVAL, props<{pagee: string, page: number, limit: number}>())

export const CONNECT_PAGE_TO_RESOURCE = createAction(PAGE_TO_RESOURCE, props<{resource: string, pagee: string, page: number, limit: number}>())

export const CREATE_PAGE = createAction(PAGE_CREATION, props<{name: string, description: string, page: number, perPage: number}>())
export const UPDATE_PAGE = createAction(PAGE_UPDATE, props<{ pagee: string, name: string, description: string, page: number, perPage: number}>())

