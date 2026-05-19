import { Profile } from "../models/profile";
import { UserResponse } from "../response/UserResponse";

export const UserInitialState: Profile = 
{
    user: {
        firstname: "",
        surname: 0,
        profilePicture: ""
    }
}

export const UserProfileInitialState: Profile = {
    user: {
        firstname: "",
        surname: 0,
        profilePicture: ""
    }
}

// export const UserInitialState: UserResponse = 
// {
//     firstname: "",
//     surname: "",
//     profilePicture: ""
// }

// export const UserProfileInitialState: { firstname: string, surname: string, profilePicture: "" } = {
    
//     firstname: "",
//     surname: "",
//     profilePicture: ""
// }