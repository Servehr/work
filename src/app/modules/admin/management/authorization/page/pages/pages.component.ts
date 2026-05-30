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
import { ConnectRexourceComponent } from '../connect-rexource/connect-rexource.component';
import { DisconnectRexourceComponent } from '../disconnect-rexource/disconnect-rexource.component';
import { LabelComponent } from '../../../../../../components/controls/label/label.component';
import { WriteActionComponent } from '../write-action/write-action.component';
import { ActionComponent } from '../action/action.component';
import { START_PAGE } from '../../../../../../state/actions/management/page.actions';
import AppState from '../../../../../../state/app.state';
import { Store } from '@ngrx/store';
import { getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { sleepWait } from '../../../../../../util/sleep';
import { getAllPage } from '../../../../../../state/selectors/admin/management/page.selector';
import { LoaderComponent } from '../../../../../../components/loader/loader.component';
import { PaginationComponent } from '../../../../../../components/pagination/pagination.component';
import { RemovePageComponent } from '../remove-page/remove-page.component';


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [ 
              FlexRenderDirective, ModalComponent, NgIcon, LoaderComponent, PaginationComponent,
              WriteActionComponent, WritePageComponent, LabelComponent, RemovePageComponent, ConnectRexourceComponent, DisconnectRexourceComponent, ActionComponent
           ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent 
{
  PageTitle: string = 'Pages'
  isLoading = signal<boolean>(false)
  buttonName: string = ''
  writePage: boolean = false
  connectPage: boolean = false
  disconnectPage: boolean = false 
  pageAction: boolean = false
  selectedPage = signal<{ id: string, name: string}>({ id: '', name: '' })
  actions: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  title: string = ''
  isModalOpen: boolean = false
  modalWidth: string = 'w-[750px]'
  dataToUpdate = signal<any>(null)
  removeData = signal<any>(null)

  // pagination
  currentPage = signal<number>(1)
  perPage  = signal<number>(10)
  totalPages = signal<number>(5)
  totalDocs =  signal<number>(10)
  hasNextPage =  signal<boolean>(true)
  hasPrevPage =  signal<boolean>(true)

  boteenStyle: any = {
    'color': 'black',
    'border': '2px solid #3e4095',
    'border-radius': '10px'
  }
  linkCss: string = "text-black border-2 bg-gray-200 hover:bg-[#3e4095] hover:text-white"
  unLinkCss: string = "text-black border-2 bg-yellow-200 hover:bg-gray-600 hover:text-white"
  boteeName: string = 'Link'

  data = signal<any>([])

  constructor(private store: Store<AppState>){}   

  async ngOnInit()
  {
    this.store.dispatch(START_PAGE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
    this.isLoading.set(true)    
    this.buttonName = 'Save'
    await sleepWait(500)
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      this.isLoading.set(data?.loader?.loading)
      if(!data?.loader?.loading)
      {
        this.isModalOpen = false
        this.isLoading.set(data?.loader?.loading)
      }
    }) 

    this.store.select(getAllPage).subscribe((pg: any) => 
    {
      this.isLoading.set(false)
      this.data.set(pg?.pages)
      this.currentPage.set(pg?.pages?.pagination?.currentPage)
      this.totalPages.set(pg?.pages?.pagination?.totalPages)
      this.hasPrevPage.set(pg?.pages?.pagination?.hasPrevPage)
      this.hasNextPage.set(pg?.pages?.pagination?.hasNextPage)
    })    
  }

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'Name'
    },
    {
       accessorKey: 'description',
       header: 'Description'
    },
    // {
    //    accessorKey: 'resources',
    //    header: 'No Of Pages'
    // },
    {
       accessorKey: 'disconnect',
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
       accessorKey: 'connect',
       header: 'Connect',
       cell: (context) => {
         const name: string = context.row.getValue('name')
         return flexRenderComponent(
            ArrowRightComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.connectPageToResource(value?.toString(), name)
              }
            }
         )
       }       
    },
    {
       accessorKey: 'action',
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
       accessorKey: 'modify',
       header: 'Modify Action',
       cell: (context) => {
         return flexRenderComponent(
            BoteenComponent, {
              inputs: {
                value: context.getValue<{ count: number, data: any }>(),
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
       accessorKey: 'change',
       header: 'Update Page',
       cell: (context) => {
        
         const name: string = context.row.getValue('name')
         const description: string = context.row.getValue('description')
         const rowData: any =  { name, description }

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
       accessorKey: 'remove',
       header: 'Remove Page',
       cell: (context) => {
         return flexRenderComponent(
            DeleteComponent, {
              inputs: {
                value: context.getValue<string>()
              },
              outputs: {
                clickEvent: (value) => this.remove(value)
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

  connectPageToResource(status: string, name: string): void
  {
    this.title = 'connect Page To Resource'
    this.buttonName = 'Save'
    this.selectedPage.set({ id: status, name: name })
    console.log(this.selectedPage())
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

  remove(value: string): void 
  {
    this.removeData.set({ department: value, currentPage: this.currentPage(), pagePage: this.perPage() })
    this.isModalOpen = true
  }

  change(cellData: any): void 
  {
    this.title = 'Update Category'
    this.buttonName = 'Update'
    this.dataToUpdate.set(cellData)
    console.log(cellData)
    this.writePage = true
  }   
    
  getData = async (event: any) => 
  {
    this.currentPage.set(Number(event.page))
    this.isLoading.set(true)  
    await sleepWait(500)
    this.store.dispatch(START_PAGE  ({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
  }


}
