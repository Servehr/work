import { Component, computed, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { DeleteComponent } from '../../../../../util/icons/delete/delete.component';
import { EditComponent } from '../../../../../util/icons/edit/edit.component';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; role: string, department: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {

  PageTitle: string = 'Users'

  isModalOpen: boolean = false
  title: string = 'Delete Item'
  modalWidth: string = 'w-[1000px]'
  addIcon: any = bootstrapPlusCircleFill

  // 2. Define data
  data = signal<Person[]>([
    { firstName: 'Tanner', lastName: 'Linsley', role: 'Admin', department: 'Sales' },
    { firstName: 'Stephen', lastName: 'Fresh', role: 'Super Admin', department: 'Director' },
    { firstName: 'Bimbo', lastName: 'Awomasun', role: 'Manager', department: 'Sales' },
    { firstName: 'Bright', lastName: 'Ben', role: 'Human Resource', department: 'Recruitment' },
    { firstName: 'Wasiu', lastName: 'Kehinde', role: 'Secretary', department: 'Reception' },
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
       accessorKey: 'role',
       header: 'Role'
    },
    {
       accessorKey: 'department',
       header: 'Department'
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




