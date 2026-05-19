import { Spinner } from "../../models/spinner.model";

export interface ISpinnerState 
{
    loader: {
        loading: boolean
        statusCode: number
    }
}