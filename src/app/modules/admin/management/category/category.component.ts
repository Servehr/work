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
import { NgIcon } from '@ng-icons/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { WriteCategoryComponent } from './write-category/write-category.component';
import { RemoveComponent } from '../../../../shared/remove/remove.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number, gender: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, WriteCategoryComponent, RemoveComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  PageTitle: string = 'Categories'
  buttonName: string = ''
  writeCategory: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  isModalOpen: boolean = false
  title: string = ''
  modalWidth: string = 'w-[700px]'

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

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeCategory = true
  }

  handleClick(value: number, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Category'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
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
                clickEvent: (value) => { 
                  this.handleClick(value, 'update')
                }
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
                clickEvent: (value) => this.handleClick(value, 'delete')
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


