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
import { ModalComponent } from '../../../../components/modal/modal.component';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { WriteDepartmentComponent } from './write-department/write-department.component';
import { NgIcon } from '@ng-icons/core';
import { RemoveComponent } from '../../../../shared/remove/remove.component';

// 1. Define your data structure
type Person = { name: string; description: string; };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, WriteDepartmentComponent, RemoveComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {

  PageTitle: string = 'Departments'
  buttonName: string = ''
  writeDepartment: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  isModalOpen: boolean = false
  title: string = ''
  modalWidth: string = 'w-[700px]'

  // 2. Define data
  data = signal<Person[]>([
    { name: 'Human Resource', description: 'Linsley' },
    { name: 'Sales', description: 'Fresh' },
    { name: 'Finance', description: 'Awomasun' },
    { name: 'Fleet', description: 'Ben' },
    { name: 'Recruitment', description: 'Kehinde' },
  ]);

  onConfirm = () => 
  {
     
  }

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeDepartment = true
  } 

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'department'
    },
    {
       accessorKey: 'description',
       header: 'About Department'
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
        
        //  const name: string = context.row.getValue('name')
        //  const description: string = context.row.getValue('description')
         const rowData: any =  { name: '', description: '' }

         return flexRenderComponent(
            EditComponent, {
              inputs: {
                value: context.getValue<string>(),
                data: rowData
              },
              outputs: {
                clickEvent: (cellData) => 
                { 
                  this.change(cellData)
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
                value: context.getValue<string>()
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

  handleClick(value: string, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Department'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
  } 

  change(value: any): void 
  {
     this.isModalOpen = true
  } 


}


