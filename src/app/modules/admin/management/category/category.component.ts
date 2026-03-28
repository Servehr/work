import { Component, computed, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { EditComponent } from '../../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../../util/icons/delete/delete.component';
import { ViewComponent } from '../../../../util/icons/view/view.component';
import { ModalComponent } from '../../../../components/modal/modal.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number, gender: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  PageTitle: string = 'Categories'

  isModalOpen: boolean = false
  title: string = 'Delete Item'
  modalWidth: string = 'w-[1000px]'

  // 2. Define data
  data = signal<Person[]>([
    { firstName: 'Tanner', lastName: 'Linsley', age: 30, gender: 'Female' },
    { firstName: 'Stephen', lastName: 'Fresh', age: 30, gender: 'Male' },
    { firstName: 'Bimbo', lastName: 'Awomasun', age: 19, gender: 'Male' },
    { firstName: 'Bright', lastName: 'Ben', age: 20, gender: 'Female' },
    { firstName: 'Wasiu', lastName: 'Kehinde', age: 28, gender: 'Female' },
  ]);

  onConfirm = () => 
  {
     
  }


  handleClick(value: number): void 
  {
     this.isModalOpen = true
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
       accessorKey: 'firstName',
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


