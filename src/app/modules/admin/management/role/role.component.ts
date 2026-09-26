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
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { sleepWait } from '../../../../util/sleep';
import { START_ROLE } from '../../../../state/actions/management/role.actions';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { getSpinnerStatus } from '../../../../state/selectors/spinner.selector';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { getAllRole } from '../../../../state/selectors/admin/management/role.selector';
import { RemoveRoleComponent } from './remove-role/remove-role.component';
import { ArrowRightComponent } from '../../../../util/icons/arrow-right/arrow-right.component';
import { BoteenComponent } from '../../../../util/icons/boteen/boteen.component';
import { AddRemoveComponent } from '../../../../util/icons/add-remove/add-remove.component';
import { RoleResourceComponent } from './role-resource/role-resource.component';
import { RoleResourceLinkingComponent } from './role-resource-linking/role-resource-linking.component';

// 1. Define your data structure
type Person = { name: string; description: string; };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
             FlexRenderDirective, NgIcon, 
             ModalComponent, 
             WriteRoleComponent, RemoveRoleComponent, LoaderComponent, PaginationComponent, RoleResourceComponent, RoleResourceLinkingComponent
           ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  PageTitle: string = 'Roles'
  buttonName: string = ''
  writeRole: boolean = false
  openRoleResource = signal<boolean>(false)
  addIcon: any = bootstrapPlusCircleFill
  isLoading = signal<boolean>(false)
  dataToUpdate = signal<any>(null)
  removeData = signal<any>(null)

  openLinkRoleResource = signal<boolean>(false)
  theRoleResources = signal<any>([])
  title = signal<string>('')
  roleResourceTitle = signal<string>('')
  roleId = signal<string>('')  
  roleName = signal<string>('')
  resources = signal<any>([])

  isModalOpen: boolean = false
  modalWidth: string = 'w-[700px]'
  modalWidthWide: string = 'w-[880px]'

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

  ToggleWithTitle = (status: string) => 
  {
    this.title.set(status)
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
       accessorKey: 'role',
       header: 'Add/Remove',
       cell: (context) => {
        
        const rexources = context.row.original.rexources
        const resourceIds = rexources.map((rexource: any) => {
          return rexource?._id
        })

        return flexRenderComponent(
           AddRemoveComponent, {
             inputs: {
               value: context.getValue<{ count: number, data: any, roleName: string }>(),
             },
             outputs: {
               clickEvent: (value) => this.connectResourceToRole(value, rexources, resourceIds)
             }
           }
         )
       }       
    }, 
    {
      accessorKey: 'resources',
      header: 'Resources Under Role',
      cell: (context) => {

        const rexources = context.row.original.rexources
        const roleName = context.row.original.name

        return flexRenderComponent(
           BoteenComponent, {
             inputs: {
               value: context.getValue<{ count: number, data: any }>(),
               boteenStyle: this.boteenStyle,
               boteeName: 0,
               boteenCssClass: this.unLinkCss,
             },
             outputs: {
               clickEvent: (value) => this.roleResource(rexources, roleName)
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
        this.title.set('Update Department')
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title())
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
    this.title.set('Update Category')
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

  connectResourceToRole(role: { count: number, data: any, roleName: string }, rexources: any, resourceIds: string[]): void
  {
    this.roleId.set(role?.data)
    const theTitle: string = `All selected rescoure(s) will be associated with ${role?.roleName}`
    this.roleResourceTitle.set(theTitle)
    this.theRoleResources.set(resourceIds)
    this.openLinkRoleResource.set(true)
  }

  roleResource(rexources: any, roleName: string): void
  {
    this.title.set(`All resources under ${roleName}`)
    this.roleName.set(roleName)
    this.resources.set(rexources)
    this.openRoleResource.set(true)
  }  

  closeOpenRoleResorce()
  {
    this.recall()
    this.openRoleResource.set(false)
  }

  closeOpenLinkRoleResource()
  {
    this.recall()
    this.openLinkRoleResource.set(false)
  }

  recall()
  {
    this.store.dispatch(START_ROLE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
  }

}




