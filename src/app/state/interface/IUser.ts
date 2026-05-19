export interface IUser 
{
    User: 
    {
        id: number, 
        firstname: string, 
        surname: string, 
        phoneNumber: string, 
        alternatePhoneNumber?: string, 
        email: string, 
        employeeId?: string,
        department: string, 
        userType: string, 
        dob: string, 
        gender: string, 
        maritalStatus: string, 
        country: string, 
        capital: string, 
        address: string, 
        imagePath?: string                
    }
}