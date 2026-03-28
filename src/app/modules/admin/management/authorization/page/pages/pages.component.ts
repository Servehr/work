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
import { ArrowLeftComponent } from '../../../../../../util/icons/arrow-left/arrow-left.component';
import { ArrowRightComponent } from '../../../../../../util/icons/arrow-right/arrow-right.component';
import { BoteenComponent } from '../../../../../../util/icons/boteen/boteen.component';
import { AddComponent } from '../../../../../../util/icons/add/add.component';

type Person = { name: string; description: string; resources: number }

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent 
{
  title: string = 'Pages'

  isModalOpen: boolean = false
  modalWidth: string = 'w-[600px]'

  boteenStyle: any = {
    'color': 'black',
    'border': '2px solid #3e4095',
    'border-radius': '10px'
  }
  linkCss: string = "text-black border-2 bg-gray-200 hover:bg-[#3e4095] hover:text-white"
  unLinkCss: string = "text-black border-2 bg-yellow-200 hover:bg-gray-600 hover:text-white"
  boteeName: string = 'Link'

  // 2. Define data
  data = signal<Person[]>(
    [ 
        { name: 'Dashboard', description: 'Dashboard', resources: 30 },
        { name: 'Management', description: 'Management', resources: 30 },
        { name: 'Administration', description: 'Administration', resources: 19 },
        { name: 'Technicians', description: 'Technicians', resources: 20 },
        { name: 'Vendors', description: 'Vendors', resources: 28 },
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
       accessorKey: 'resources',
       header: 'No Of Pages'
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            ArrowLeftComponent, {
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
            ArrowRightComponent, {
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
            AddComponent, {
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
            BoteenComponent, {
              inputs: {
                value: context.getValue<number>(),
                boteenStyle: this.boteenStyle,
                boteeName: '5',
                boteenCssClass: this.unLinkCss,
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
