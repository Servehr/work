import { Dexie, Entity, EntityTable, Table } from 'dexie';


export interface IUser 
{
  id?: number
  userId: string
  firstname: string
  surname: string
  token?: string
}

// export class StorageDB extends Dexie 
// {
//   user!: Table<IUser, number>;

//   constructor() {
//     super('technicians-work')
//     this.version(4).stores(
//       {
//         user: '++id, todoListId'
//       }
//     );
//   }
// }

// export const db = new StorageDB()

const db = new Dexie('technicianswork') as Dexie & {
   user: EntityTable<IUser, 'id'>
}

db.version(6).stores({
   user: '++id, userId, firstname, surname, token'
})

export { db }
