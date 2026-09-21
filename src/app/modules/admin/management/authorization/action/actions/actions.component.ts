import { Component, input, Input, model, signal } from '@angular/core'
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { LinkUnlinkComponent } from '../link-unlink/link-unlink.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { sleepWait } from '../../../../../../util/sleep';
import { getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { START_PAGE_AKTION } from '../../../../../../state/actions/management/aktion.actions';
import { getAllAktions } from '../../../../../../state/selectors/admin/management/aktion.selector';

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
  isLoading = signal<boolean>(false)
  linkUnlink: boolean = false
  modalWidth: string = 'w-[600px]'
  buttonName = signal<string>('')
  icon: any = bootstrapTrash

  boteenStyle: any = {
    'color': 'black',
    'border': '2px solid #3e4095',
    'border-radius': '10px'
  }
  linkCss: string = "text-black border-2 bg-gray-200 hover:bg-[#3e4095] hover:text-white"
  unLinkCss: string = "text-black border-2 bg-yellow-200 hover:bg-gray-600 hover:text-white"
  boteeName: string = 'Link'
  
  // pagination
  currentPage = signal<number>(1)
  perPage  = input<number>(10)
  totalPages = signal<number>(5)
  totalDocs =  signal<number>(10)
  hasNextPage =  signal<boolean>(true)
  hasPrevPage =  signal<boolean>(true)

  // 2. Define data
  data = signal<any>(null)

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
       accessorKey: 'pageName',
       header: 'Page'
    },
    // {
    //    accessorKey: '...',
    //    header: '',
    //    cell: (context) => {
    //      return flexRenderComponent(
    //          BoteenComponent, {
    //           inputs: {
    //             value: context.getValue<{ count: number, data: any }>(),
    //             boteenStyle: this.boteenStyle,
    //             boteeName: this.boteeName,
    //             boteenCssClass: this.linkCss
    //           },
    //           outputs: {
    //             clickEvent: (value) => this.handleClick(value)
    //           }
    //         }
    //      )
    //    }       
    // }
  ]

  // 4. Create the table instance
  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }))


  constructor(private store: Store<AppState>){}

  async ngOnInit()
  {
    this.store.dispatch(START_PAGE_AKTION({ pagee: Number(this.currentPage()), limit: Number(this.perPage()) }))
    this.isLoading.set(true)    
    this.buttonName.set('Save')
    await sleepWait(500)
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      if(!data?.loader?.loading)
      {
        this.isModalOpen = false
        this.isLoading.set(data?.loader?.loading)
      }
    }) 

    this.store.select(getAllAktions).subscribe((data: any) => 
    {
      if(data?.fromPlace?.location === 'Aktion')
      {
         this.data.set(data)
      }
      console.log(data)
      // this.isLoading.set(false)
      // if(data?.loader?.page === 'all-page')
      // {
        // this.data.set(data?.pages)
        // this.currentPage.set(data?.pages?.pagination?.currentPage)
        // this.totalPages.set(data?.pages?.pagination?.totalPages)
        // this.hasPrevPage.set(data?.pages?.pagination?.hasPrevPage)
        // this.hasNextPage.set(data?.pages?.pagination?.hasNextPage)
      // }
    })    
  }  

  handleClick(value: number): void 
  {
    this.linkUnlink = true
  } 

}
