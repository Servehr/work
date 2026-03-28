import { AuthResponse } from "../response/AuthResponse";

export const AuthInitialState: AuthResponse = {
    message: "",
    firstname: "",
    surname: "",
    token: ""
}

export const AuthRegInitialState: { message: string } = {
    message: ""
}