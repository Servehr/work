import { createAction, props } from "@ngrx/store";
import { SPINNING_STARTED, MESSAGE, CLAR_MESSAGE } from "../constants/spinner";

interface ILoader
{
   loading: boolean
   statusCode: number
}
export const SetLoadingStatus = createAction(SPINNING_STARTED, props<{ loader: ILoader }>())

export const SetErrorMessage = createAction(MESSAGE, props<{ msg: string, statusCode: number, operation: string }>())

export const SetClearErrorMessage = createAction(CLAR_MESSAGE, props<{ msg: string, statusCode: number, operation: string }>())