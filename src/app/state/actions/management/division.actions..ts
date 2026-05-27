import { createAction, props } from "@ngrx/store";
import { DIVISION_START, DIVISION_CREATION_SUCCESS, DIVISION_REMOVE, DIVISION_CREATION, DIVISION_UPDATE } from "../../constants/management/division.";


export const LOAD_DIVISIONS = createAction(DIVISION_START, props<{category: string, page: number, limit: number}>())
export const DIVISION_SUCCESS = createAction(DIVISION_CREATION_SUCCESS, props<{ division: any}>())

export const REMOVE = createAction(DIVISION_REMOVE, props<{ path: string, model: string}>())
export const REMOVE_DIVISION = createAction(DIVISION_REMOVE, props<{category: string, division: string, page: number, limit: number}>())

export const CREATE_DIVISION = createAction(DIVISION_CREATION, props<{category: string, name: string, description: string, page: number, perPage: number}>())
export const UPDATE_DIVISION = createAction(DIVISION_UPDATE, props<{category: string, division: string, name: string, description: string, page: number, perPage: number}>())

