import { User } from "./user.model";

export interface Update 
{    
    user: {
        position: number
        status: boolean
        userToUpdate: User
    }
}