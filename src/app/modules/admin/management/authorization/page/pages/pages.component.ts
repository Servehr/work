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
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { WritePageComponent } from '../write-page/write-page.component';
import { NgIcon } from '@ng-icons/core';
import { RemoveComponent } from '../../../../../../shared/remove/remove.component';
import { ConnectRexourceComponent } from '../connect-rexource/connect-rexource.component';
import { DisconnectRexourceComponent } from '../disconnect-rexource/disconnect-rexource.component';
import { LabelComponent } from '../../../../../../components/controls/label/label.component';
import { WriteActionComponent } from '../write-action/write-action.component';
import { ActionComponent } from '../action/action.component';

type Person = { name: string; description: string; resources: number }

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [ 
              FlexRenderDirective, ModalComponent, NgIcon, 
              WriteActionComponent, WritePageComponent, LabelComponent, RemoveComponent, ConnectRexourceComponent, DisconnectRexourceComponent, ActionComponent
           ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent 
{
  PageTitle: string = 'Pages'
  buttonName: string = ''
  writePage: boolean = false
  connectPage: boolean = false
  disconnectPage: boolean = false
  pageAction: boolean = false
  actions: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  title: string = ''

  isModalOpen: boolean = false
  modalWidth: string = 'w-[750px]'

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
       header: 'Disconnect',
       cell: (context) => {
         return flexRenderComponent(
            ArrowLeftComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.disconnectPageToResource(value)
              }
            }
         )
       }       
    },
    {
       accessorKey: '...',
       header: 'Connect',
       cell: (context) => {
         return flexRenderComponent(
            ArrowRightComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.connectPageToResource(value)
              }
            }
         )
       }       
    },
    {
       accessorKey: '...',
       header: 'Create Action',
       cell: (context) => {
         return flexRenderComponent(
            AddComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.action(value)
              }
            }
         )
       }       
    },
    {
       accessorKey: '...',
       header: 'Modify Action',
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
                clickEvent: (value) => this.pageActions(value)
              }
            }
          )
       }       
    },
    {
       accessorKey: '...',
       header: 'Update Page',
       cell: (context) => {
         return flexRenderComponent(
            EditComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.handleClick(value, 'update')
              }
            }
         )
       }       
    },
    {
       accessorKey: 'firstName',
       header: 'Remove Page',
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
    this.writePage = true
  }

  handleClick(value: number, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Page'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
  }

  connectPageToResource(status: number): void
  {
    this.title = 'connect Page To Resource'
    this.buttonName = 'Save'
    this.connectPage = true     
  }

  disconnectPageToResource(status: number): void
  {
    this.title = 'Disconnect Page From Resource'
    this.buttonName = 'Save'
    this.disconnectPage = true     
  }

  action(status: number): void
  {
    this.title = 'Create Action'
    this.buttonName = 'Save'
    this.pageAction = true     
  }

  pageActions(status: number): void
  {
    this.title = 'Page Action'
    this.buttonName = 'Save'
    this.actions = true     
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
