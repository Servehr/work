import { Component, Input, signal } from '@angular/core'
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { DeleteComponent } from '../../../../../../util/icons/delete/delete.component';
import { EditComponent } from '../../../../../../util/icons/edit/edit.component';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { WriteRexourceComponent } from '../write-rexource/write-rexource.component';
import { RemoveComponent } from '../../../../../../shared/remove/remove.component';

type Person = { name: string; description: string; pages: number }

@Component({
  selector: 'app-rexource',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, WriteRexourceComponent, RemoveComponent],
  templateUrl: './rexource.component.html',
  styleUrl: './rexource.component.scss'
})
export class RexourceComponent 
{
  PageTitle: string = 'Resources'
  title: string = ''
  @Input() buttonName: string = ''
  writeRexource: boolean = false
  addIcon: any = bootstrapPlusCircleFill
   
  isModalOpen: boolean = false
  modalWidth: string = 'w-[700px]'


  // 2. Define data
  data = signal<Person[]>(
    [ 
        { name: 'Dashboard', description: 'Dashboard', pages: 30 },
        { name: 'Management', description: 'Management', pages: 30 },
        { name: 'Administration', description: 'Administration', pages: 19 },
        { name: 'Technicians', description: 'Technicians', pages: 20 },
        { name: 'Vendors', description: 'Vendors', pages: 28 },
    ]
  ) 

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'Name'
    },
    {
       accessorKey: 'description',
       header: 'Description'
    },
    {
       accessorKey: 'pages',
       header: 'No Of Pages'
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

  onConfirm = () => 
  {
     
  }

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeRexource = true
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