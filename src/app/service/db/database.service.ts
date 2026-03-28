import { Injectable } from '@angular/core';
import { db } from '../../db/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  // { userId: string, firstname: string, surname: string, token: string }
  async newUser(user: { userId: string, firstname: string, surname: string, token: string }) 
  {
    try 
    {
      const id = await db.user.add(user)
      console.log(`User added with id => : ${id}`)
    } catch (error) {
      console.error('Error adding user => :', error)
    }
  }
  
  getUser() 
  {
    return db.user.toArray()
  }

  removeUser() 
  {
    return db.user.clear()
  }

  removeUsers(id: number) 
  {
    return db.user.delete(id)
  }
}
