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
import { BoteenComponent } from '../../../../../../util/icons/boteen/boteen.component';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';

type Person = { name: string; description: string; pages: number }

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent 
{
  pageTitle: string = 'Actions'

  isModalOpen: boolean = false
  modalWidth: string = 'w-[600px]'
  icon: any = bootstrapTrash

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
             BoteenComponent, {
              inputs: {
                value: context.getValue<number>(),
                boteenStyle: this.boteenStyle,
                boteeName: this.boteeName,
                boteenCssClass: this.linkCss
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
                boteeName: 'Unlink',
                boteenCssClass: this.unLinkCss,
                icon:   bootstrapTrash  //\\ "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z\"/><path d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z\"/></svg>" //bootstrapTrash
              },
              outputs: {
                clickEvent: (value) => this.handleClick(value)
              }
            }
         )
       }       
    },
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
