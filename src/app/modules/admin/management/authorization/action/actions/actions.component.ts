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
import { LinkUnlinkComponent } from '../link-unlink/link-unlink.component';

type Person = { name: string; description: string; }

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, LinkUnlinkComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent 
{
  pageTitle: string = 'Actions'

  isModalOpen: boolean = false
  linkUnlink: boolean = false
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
        { name: 'Create-Merchant', description: 'Dashboard' },
        { name: 'Update-Merchant', description: 'Management' },
        { name: 'Delete-Merchant', description: 'Administration' },
        { name: 'Read-Merchant', description: 'Technicians' }
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
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
             BoteenComponent, {
              inputs: {
                value: context.getValue<{ count: number, data: any }>(),
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
    }
  ]

  onConfirm = () => 
  {
     
  }

  handleClick(value: number): void 
  {
    this.linkUnlink = true
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
