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
      await db.user.add(user)
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

  async userLocation(currentLocation: any) 
  {
    try 
    {
      await db.location.add(currentLocation)
    } catch (error) {
      console.error('Error adding user => :', error)
    }
  }

  async clearUserCurrentPosition() 
  {
    return await db.location.clear()
  }

  async getUserLocation() 
  {
    return await db.location.toArray()
  }

}
