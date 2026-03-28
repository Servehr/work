export class AuthResponse
{

    constructor(
      public firstname: string, 
      public surname: string,
      public message: string,
      public token: string
    ){}
}