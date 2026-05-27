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
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { sleepWait } from '../../../../../../util/sleep';
import { getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { getAllRexource } from '../../../../../../state/selectors/admin/management/rexource.selector';
import { START_REXOURCE } from '../../../../../../state/actions/management/rexource.actions';
import { RemoveRexourceComponent } from '../remove-rexource/remove-rexource.component';
import { LoaderComponent } from '../../../../../../components/loader/loader.component';
import { PaginationComponent } from '../../../../../../components/pagination/pagination.component';
import { BoteenComponent } from '../../../../../../util/icons/boteen/boteen.component';

type Person = { name: string; description: string; pages: number }

@Component({
  selector: 'app-rexource',
  standalone: true,
  imports: [
              FlexRenderDirective, NgIcon,
              ModalComponent, LoaderComponent, PaginationComponent,
              WriteRexourceComponent, RemoveRexourceComponent
           ],
  templateUrl: './rexource.component.html',
  styleUrl: './rexource.component.scss'
})
export class RexourceComponent 
{
  PageTitle: string = 'Resources'
  @Input() buttonName: string = ''
  writeRexource: boolean = false
  isLoading = signal<boolean>(false)
  addIcon: any = bootstrapPlusCircleFill
  dataToUpdate = signal<any>(null)
  removeData = signal<any>(null)

   
  isModalOpen: boolean = false
  title: string = ''
  modalWidth: string = 'w-[700px]'

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

  constructor(private store: Store<AppState>){} 

  async ngOnInit()
  {
    this.store.dispatch(START_REXOURCE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
    this.isLoading.set(true)    
    this.buttonName = 'Save'
    await sleepWait(500)
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      this.isLoading.set(data?.loader?.loading)
      if(!data?.loader?.loading && data?.loader?.page === 'rexource')
      {
        this.isModalOpen = false
        this.isLoading.set(data?.loader?.loading)
      }
    }) 

    this.store.select(getAllRexource).subscribe((rexrc: any) => 
    {
      this.isLoading.set(false)
      this.data.set(rexrc?.departments)
      this.currentPage.set(rexrc?.departments?.pagination?.currentPage)
      this.totalPages.set(rexrc?.departments?.pagination?.totalPages)
      this.hasPrevPage.set(rexrc?.departments?.pagination?.hasPrevPage)
      this.hasNextPage.set(rexrc?.departments?.pagination?.hasNextPage)
    })    
  }

  data = signal<any>([])

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
      accessorKey: 'rexourcePages',
      header: 'No Of Pages',
      cell: (context) => 
      {
         const rowId: string = context.row.original?._id as string
         return flexRenderComponent(
            BoteenComponent, {
              inputs: {
                value: context.getValue<{ count: number, data: any }>(),
                boteenStyle: this.boteenStyle,
                boteenCssClass: this.unLinkCss,
              },
              outputs: {
                // clickEvent: (division) => this.categoryDivisions(rowId)
              }
            }
          )
       }       
    }, 
    {
       accessorKey: 'change',
       header: '',
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
       header: '',
       cell: (context,) => {
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
    this.writeRexource = true
  }

  handleClick(value: string, action: string): void 
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
  
  closeRexource = () => 
  {
    this.dataToUpdate.set({ id: "", data: { name: '', description: '' } })
    this.writeRexource = false
  }  

  change(cellData: any): void 
  {
    this.title = 'Update Category'
    this.buttonName = 'Update'
    this.dataToUpdate.set(cellData)
     this.writeRexource = true
  } 

  remove(value: string): void 
  {
    this.removeData.set({ department: value, currentPage: this.currentPage(), pagePage: this.perPage() })
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

  getData = async (event: any) => 
  {
    this.currentPage.set(Number(event.page))
    this.isLoading.set(true)  
    await sleepWait(500)
    this.store.dispatch(START_REXOURCE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
  }  


}