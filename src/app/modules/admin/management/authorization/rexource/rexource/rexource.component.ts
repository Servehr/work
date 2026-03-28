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

type Person = { name: string; description: string; pages: number }

@Component({
  selector: 'app-rexource',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent],
  templateUrl: './rexource.component.html',
  styleUrl: './rexource.component.scss'
})
export class RexourceComponent 
{
    title: string = 'Resources'

  isModalOpen: boolean = false
  modalWidth: string = 'w-[600px]'

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

  onConfirm = () => 
  {
     
  }

  handleClick(value: number): void 
  {
    this.isModalOpen = true
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