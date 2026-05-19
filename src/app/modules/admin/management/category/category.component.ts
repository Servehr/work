import { Component, computed, effect, inject, input, signal, SimpleChanges, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent,
  getPaginationRowModel,
  PaginationState
} from '@tanstack/angular-table';
import { EditComponent } from '../../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../../util/icons/delete/delete.component';
import { ViewComponent } from '../../../../util/icons/view/view.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { NgIcon } from '@ng-icons/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { WriteCategoryComponent } from './write-category/write-category.component';
import { RemoveComponent } from '../../../../shared/remove/remove.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { getSpinnerStatus } from '../../../../state/selectors/spinner.selector';
import { START_CATEGORY } from '../../../../state/actions/management/category.actions';
import { getAllCategory } from '../../../../state/selectors/admin/management/category.action';
import { toSentenceCase } from '../../../../util/text';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { sleepWait } from '../../../../util/sleep';
import { BoteenComponent } from '../../../../util/icons/boteen/boteen.component';
import { DivisionComponent } from './divisions/division/division.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number, gender: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
              FlexRenderDirective, NgIcon, 
              PaginationComponent, DivisionComponent, WriteCategoryComponent, RemoveComponent, ModalComponent, ModalComponent, LoaderComponent,
           ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  PageTitle: string = 'Categories'
  buttonName: string = ''
  writeCategory = signal<boolean>(false)
  addIcon: any = bootstrapPlusCircleFill
  isLoading = signal<boolean>(false)
  divisions = signal<any>([])

  category = signal<string>('')
  path = signal<string>('')

  // pagination
  currentPage = signal<number>(1)
  perPage  = signal<number>(5)
  totalPages = signal<number>(5)
  totalDocs =  signal<number>(10)
  hasNextPage =  signal<boolean>(true)
  hasPrevPage =  signal<boolean>(true)

  isModalOpen: boolean = false
  title: string = ''
  modalWidth: string = 'w-[700px]'
  actions: boolean = false
  dataToUpdate = signal<any>(null)
  id = signal<string>("")

  boteenStyle: any = {
    'color': 'black',
    'border': '2px solid #3e4095',
    'border-radius': '10px'
  }
  linkCss: string = "text-black border-2 bg-gray-200 hover:bg-[#3e4095] hover:text-white"
  unLinkCss: string = "text-black border-2 bg-yellow-200 hover:bg-gray-600 hover:text-white"
  boteeName: string = 'Link'  

  constructor(private store: Store<AppState>)
  {
    // this.store.dispatch(START_CATEGORY({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
    effect(() => 
    {
       this.dataToUpdate() 
    }) 
  }   

  // 2. Define data
  data = signal<any>([])

  async ngOnInit()
  {
    this.store.dispatch(START_CATEGORY({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
    this.isLoading.set(true)    
    this.buttonName = 'Save'
    await sleepWait(1000)
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      this.isLoading.set(data?.loader?.loading)
      if(!data?.loader?.loading)
      {
        this.isModalOpen = false
        this.isLoading.set(data?.loader?.loading)
        // this.writeCategory.set(false)   
      }
    }) 

    this.store.select(getAllCategory).subscribe((cat: any) => 
    {
      this.isLoading.set(false)
      this.data.set(cat?.category)
      this.currentPage.set(cat?.category?.pagination?.currentPage)
      this.totalPages.set(cat?.category?.pagination?.totalPages)
      this.hasPrevPage.set(cat?.category?.pagination?.hasPrevPage)
      this.hasNextPage.set(cat?.category?.pagination?.hasNextPage)
    })   
    
    
  }

  writeCategori = () => 
  {
    this.dataToUpdate.set({ id: "", data: { name: '', description: '' } })
    this.writeCategory.set(false)
  }

  create(value: string)
  {
    this.title = value
    this.writeCategory.set(true)   
  }

  change(cellData: any): void 
  {
    this.title = 'Update Category'
    this.buttonName = 'Update'
    this.writeCategory.set(true)
    // console.log(cellData)
    this.dataToUpdate.set(cellData)
  } 

  ngOnChanges(changes: SimpleChanges)
   {
     if(changes['dataToUpdate'])
     {
        console.log(changes['dataToUpdate'])
     }
  }  

  remove(value: string): void 
  {
    this.title = 'Delete Category'
    this.buttonName = 'Update'
    this.isModalOpen = true
    this.category.set(value)
    this.path.set('category/remove')
  }  

  columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => toSentenceCase(info.renderValue() as string),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: (info) => toSentenceCase(info.renderValue() as string),
    },
    {
      accessorKey: 'divisions',
      header: 'Divisions',
      cell: (context) => {
         return flexRenderComponent(
            BoteenComponent, {
              inputs: {
                value: context.getValue<{ count: number, data: any }>(),
                boteenStyle: this.boteenStyle,
                boteenCssClass: this.unLinkCss,
              },
              outputs: {
                clickEvent: (division) => this.categoryDivisions(division)
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

  pagination = signal<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 20,
    }
  )  

  // 4. Create the table instance
  table = createAngularTable(() => (
    {
      data: this.data(),
      columns: this.columns,
      // state: {
      //   pagination: this.pagination(),
      // },
      // state: {
      //    pagination: this.pagination()
      // },
      manualPagination: true,
      getCoreRowModel: getCoreRowModel(),
      rowCount: 12,
    }
  ));

  // table = createAngularTable(() => ({
  //   data: this.data(),
  //   columns: this.columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })) 

  categoryDivisions(division: any): void
  {
    this.title = 'All division under category'
    this.buttonName = 'Save'
    this.actions = true        
    this.dataToUpdate.set({ id: "", data: { name: "", description: "" } })
    this.divisions.set(division) 
  }

  onConfirm = () => 
  {
  }

  getData = async (event: any) => 
  {
    this.currentPage.set(this.currentPage())
    this.isLoading.set(true)  
    await sleepWait(500)
    this.store.dispatch(START_CATEGORY({ page: Number(event.page), limit: Number(this.perPage()) }))
  }

}


