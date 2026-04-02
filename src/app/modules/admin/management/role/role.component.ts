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
import { WriteRoleComponent } from './write-role/write-role.component';
import { NgIcon } from '@ng-icons/core';
import { RemoveComponent } from '../../../../shared/remove/remove.component';

// 1. Define your data structure
type Person = { name: string; description: string; };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, WriteRoleComponent, RemoveComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  PageTitle: string = 'Roles'
  buttonName: string = ''
  writeRole: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  isModalOpen: boolean = false
  title: string = ''
  modalWidth: string = 'w-[700px]'

  // 2. Define data
  data = signal<Person[]>([
    { name: 'Manager', description: 'Linsley' },
    { name: 'Human Resource', description: 'Fresh' },
    { name: 'Sales Manager', description: 'Awomasun' },
    { name: 'Digital Expert', description: 'Ben' }
  ]);

  onConfirm = () => 
  {
     
  }

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeRole = true
  }

  handleClick(value: number, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Role'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
  }  

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'Role'
    },
    {
       accessorKey: 'description',
       header: 'About Role'
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




