import { createAction, props } from "@ngrx/store";
import { ABOUT_CREATION, ABOUT_CREATION_SUCCESS, ABOUT_REMOVE, ABOUT_START, ABOUT_UPDATE } from "../../constants/cms/about";



export const START_ABOUT = createAction(ABOUT_START)
export const ABOUT_SUCCESS = createAction(ABOUT_CREATION_SUCCESS, props<{ about: any }>())

export const REMOVE = createAction(ABOUT_REMOVE, props<{ data: any }>())
export const REMOVE_ABOUT = createAction(ABOUT_REMOVE, props<{ about: string }>())

export const CREATE_ABOUT = createAction(ABOUT_CREATION, props<{title: string, aboutus: string, images: string[]}>())
export const UPDATE_ABOUT = createAction(ABOUT_UPDATE, props<{about: string, title: string, aboutus: string, images: string[]}>())

