import { Component, computed, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  FlexRenderComponent,
  flexRenderComponent
} from '@tanstack/angular-table';
import { EditComponent } from '../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../util/icons/delete/delete.component';
import { ViewComponent } from '../../../util/icons/view/view.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number, gender: string };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [FlexRenderDirective], // Import necessary modules
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {

  PateTitle: string = 'Partners'

  // 2. Define data
  data = signal<Person[]>([
    { firstName: 'Tanner', lastName: 'Linsley', age: 30, gender: 'Female' },
    { firstName: 'Stephen', lastName: 'Fresh', age: 30, gender: 'Male' },
    { firstName: 'Bimbo', lastName: 'Awomasun', age: 19, gender: 'Male' },
    { firstName: 'Bright', lastName: 'Ben', age: 20, gender: 'Female' },
    { firstName: 'Wasiu', lastName: 'Kehinde', age: 28, gender: 'Female' },
  ]);


  handleClick(value: number): void {
     alert("Grace")
  }  

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'firstName',
       header: 'First Name'
    },
    {
       accessorKey: 'lastName',
       header: 'Last Name'
    },
    {
       accessorKey: 'age',
       header: 'Age'
    },
    {
       accessorKey: 'gender',
       header: 'Gender'
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            ViewComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.handleClick(value)
              }
            }
         )
       }       
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            EditComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.handleClick(value)
              }
            }
         )
       }       
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            DeleteComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.handleClick(value)
              }
            }
         )
       }       
    }
  ]

  // 4. Create the table instance
  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }))

  callOut = () => 
  {
      alert("Yeah!! Good")
  }


}


