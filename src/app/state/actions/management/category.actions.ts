import { createAction, props } from "@ngrx/store";
import { JOB_START, JOB_CREATION_SUCCESS, CATEGORY_SEARCH_START, CATERGORY_SEARCH_SUCCESS } from "../../constants/jobs";
import { CATEGORY_CREATION, CATEGORY_CREATION_SUCCESS, CATEGORY_REMOVE, CATEGORY_START, CATEGORY_UPDATE } from "../../constants/management/category";


interface ICategories 
{
   id: string
   name: string 
   description: string
}

export const START_CATEGORY = createAction(CATEGORY_START, props<{page: number, limit: number}>())
export const CATEGORY_SUCCESS = createAction(CATEGORY_CREATION_SUCCESS, props<{ category: any}>())

export const REMOVE = createAction(CATEGORY_REMOVE, props<{ path: string, model: string}>())

// export const RETRIEVE_CATEGORY = createAction(CATEGORY_SEARCH_START)
// export const CATEGORY_SUCCESS = createAction(CATERGORY_SEARCH_SUCCESS, props<{user: any}>())

export const CREATE_CATEGORY = createAction(CATEGORY_CREATION, props<{name: string, description: string, page: number, perPage: number}>())
export const CREATE_UPDATE = createAction(CATEGORY_UPDATE, props<{category: string, name: string, description: string, page: number, perPage: number}>())

