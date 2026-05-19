export interface Auth 
{    
    auth: {    
        actions: [] | [{}] | null
        resources: [] | null
        role: string
        token: string
        user: object
        user_type: string
    }
}

export interface AuthReg 
{    
    firstname: string
    surname: string
    phone: number 
    email: string
    token: string
    nin?: string
    passport?: string
}