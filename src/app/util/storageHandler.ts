import { DatabaseService } from "../service/db/database.service"


export const StorageHandler = async () => 
{
   let User = new DatabaseService()
   let InSession = await User.getUser()
   console.log(InSession[0]?.token)
   return InSession[0]?.token?.toString()
}