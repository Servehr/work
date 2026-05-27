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
import { WriteRoleComponent } from './write-role/write-role.component';
import { NgIcon } from '@ng-icons/core';
import { RemoveComponent } from '../../../../shared/remove/remove.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { sleepWait } from '../../../../util/sleep';
import { START_ROLE } from '../../../../state/actions/management/role.actions';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { getSpinnerStatus } from '../../../../state/selectors/spinner.selector';
import { getAllDepartment } from '../../../../state/selectors/admin/management/department.selector';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { getAllRole } from '../../../../state/selectors/admin/management/role.selector';
import { RemoveRoleComponent } from './remove-role/remove-role.component';

// 1. Define your data structure
type Person = { name: string; description: string; };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
             FlexRenderDirective, NgIcon, 
             ModalComponent, 
             WriteRoleComponent, RemoveRoleComponent, LoaderComponent, PaginationComponent
           ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  PageTitle: string = 'Roles'
  buttonName: string = ''
  writeRole: boolean = false
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

  // 2. Define data
  data = signal<any>([])

  constructor(private store: Store<AppState>)
  {
    effect(() => 
    {
      //  this.dataToUpdate() 
    }) 
  }   

  async ngOnInit()
  {
    this.store.dispatch(START_ROLE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
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

    this.store.select(getAllRole).subscribe((role: any) => 
    {
      this.isLoading.set(false)
      this.data.set(role?.roles)
      this.currentPage.set(role?.roles?.pagination?.currentPage)
      this.totalPages.set(role?.roles?.pagination?.totalPages)
      this.hasPrevPage.set(role?.roles?.pagination?.hasPrevPage)
      this.hasNextPage.set(role?.roles?.pagination?.hasNextPage)
    })    
  }  

  onConfirm = () => 
  {
     
  }

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeRole = true
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
    this.writeRole = false
  }  

  change(cellData: any): void 
  {
    this.title = 'Update Category'
    this.buttonName = 'Update'
    // this.writeCategory.set(true)
    console.log(cellData)
    this.dataToUpdate.set(cellData)
     this.writeRole = true
  } 

  remove(value: string): void 
  {
    this.removeData.set({ role: value, currentPage: this.currentPage(), pagePage: this.perPage() })
    this.isModalOpen = true
  }   
  
  getData = async (event: any) => 
  {
    this.currentPage.set(Number(event.page))
    this.isLoading.set(true)  
    await sleepWait(500)
    this.store.dispatch(START_ROLE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
  }

}




