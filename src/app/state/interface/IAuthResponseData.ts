export interface IAuthResponseData 
{
    token: number,
    user_type: string,
    user: {
        id: 2,
        firstname: string,
        surname: string,
        phone_number: string,
        email: string
    },
    role: string,
    resources: [],
    actions: []
}