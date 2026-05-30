import { Component, computed, effect, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { EditComponent } from '../../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../../util/icons/delete/delete.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { WriteDepartmentComponent } from './write-department/write-department.component';
import { NgIcon } from '@ng-icons/core';
import { START_DEPARTMENT } from '../../../../state/actions/management/department.actions';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { sleepWait } from '../../../../util/sleep';
import { getSpinnerStatus } from '../../../../state/selectors/spinner.selector';
import { getAllDepartment } from '../../../../state/selectors/admin/management/department.selector';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { RemoveDepartmentComponent } from './remove-department/remove-department.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';


const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
              FlexRenderDirective, ModalComponent, NgIcon, 
              WriteDepartmentComponent, RemoveDepartmentComponent, PaginationComponent,
              LoaderComponent
            ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {

  PageTitle: string = 'Departments'
  buttonName: string = ''
  writeDepartment: boolean = false
  addIcon: any = bootstrapPlusCircleFill
  isLoading = signal<boolean>(false)
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

  data = signal<any>([])

  constructor(private store: Store<AppState>){}   

  async ngOnInit()
  {
    this.store.dispatch(START_DEPARTMENT({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
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

    this.store.select(getAllDepartment).subscribe((dept: any) => 
    {
      this.isLoading.set(false)
      this.data.set(dept?.departments)
      this.currentPage.set(dept?.departments?.pagination?.currentPage)
      this.totalPages.set(dept?.departments?.pagination?.totalPages)
      this.hasPrevPage.set(dept?.departments?.pagination?.hasPrevPage)
      this.hasNextPage.set(dept?.departments?.pagination?.hasNextPage)
    })    
  }  

  onConfirm = () => 
  {
     
  }

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeDepartment = true
  } 

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'department'
    },
    {
       accessorKey: 'description',
       header: 'About Department'
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

  handleClick(value: string, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Department'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
  } 
  
  writeDept = () => 
  {
    this.dataToUpdate.set({ id: "", data: { name: '', description: '' } })
    this.writeDepartment = false
  }  

  change(cellData: any): void 
  {
    this.title = 'Update Category'
    this.buttonName = 'Update'
    // this.writeCategory.set(true)
    this.dataToUpdate.set(cellData)
    this.writeDepartment = true
  } 

  remove(value: string): void 
  {
    this.removeData.set({ department: value, currentPage: this.currentPage(), pagePage: this.perPage() })
    this.isModalOpen = true
  }   
  
  getData = async (event: any) => 
  {
    this.currentPage.set(Number(event.page))
    this.isLoading.set(true)  
    await sleepWait(500)
    this.store.dispatch(START_DEPARTMENT({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
  }


}


