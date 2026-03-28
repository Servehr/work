import { User } from "../../models/user.model";

export interface IUserToUpdateState
{    
    user: {
        position: number
        status: boolean
        userToUpdate: User
    }
}