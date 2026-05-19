import { Dexie, Entity, EntityTable, Table } from 'dexie';


export interface IUser 
{
  id?: number
  userId: string
  firstname: string
  surname: string
  token?: string
}

export interface ILocation
{
   id?: string
   longitude: string
   latitude: string
}

export class StorageDB extends Dexie 
{
  user!: Table<IUser, number>;  
  location!: Table<ILocation, number>;  

  constructor() {
    super('technicians-work')
    this.version(1000).stores(
      {
        user: '++id, userId, firstname, surname, token',
        location: '++id, longitude, latitude'
      }
    );
  }
}

export const db = new StorageDB()