import { Component, computed, EventEmitter, inject, Input, OnInit, Output, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { DeleteComponent } from '../../../../../util/icons/delete/delete.component';
import { EditComponent } from '../../../../../util/icons/edit/edit.component';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { getResponseMessage, getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';
import { categoryNameRequired, categoryDescriptionRequired } from '../../../management/category/write-category/write-category.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../../state/app.state';
import { InputFieldComponent } from '../../../../../components/controls/input-field/input-field.component';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';
import { RemoveComponent } from '../../../../../shared/remove/remove.component';
import { WriteStaffComponent } from '../write-staff/write-staff.component';
import { TakeActionOnStaffComponent } from '../../../../../shared/take-action-on-staff/take-action-on-staff.component';
import { AdministerComponentmponent } from '../administer/administer.component';
import { BoteenComponent } from '../../../../../util/icons/boteen/boteen.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; role: string, department: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
              FlexRenderDirective, ModalComponent, NgIcon, ReactiveFormsModule, 
              InputFieldComponent, BotinComponent, RemoveComponent, WriteStaffComponent, TakeActionOnStaffComponent, AdministerComponentmponent
           ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent  implements OnInit {

  private store = inject(Store<AppState>)

  @Input() title: string = ''
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter()

  PageTitle: string = 'Users'

  isModalOpen: boolean = false
  isLoading: boolean = false
  message: string = ''
  statusCode!: number
  writeStaff: boolean = false
  administring: boolean = false
  takeActionOnStaff: boolean = false
  modalWidth: string = 'w-[900px]'
  addIcon: any = bootstrapPlusCircleFill
  style: any = {
   'background-color' : '#be9d18',
   'color': 'black',
   'padding': '20px'
  }

  boteenStyle: any = {
    'color': 'black',
    'border': '2px solid #3e4095',
    'border-radius': '10px'
  }
  linkCss: string = "text-black border-2 border-yellow-400 bg-gray-200 hover:bg-[#3e4095] hover:text-white text-[9px]"
  unLinkCss: string = "text-black border-2 bg-yellow-200 hover:bg-gray-600 hover:text-white"
  boteeName: string = 'Assign'
  
  errorMessages = 
  { 
    categoryNameRequired: 'Enter category name', 
    categoryDescriptionRequired: 'Write a note about category to be created'
  } 

  administerForm: FormGroup

  constructor()
  {
    this.administerForm = new FormGroup(
     {
       categoryName: new FormControl('', [categoryNameRequired]),
       categoryDescription: new FormControl('', [categoryDescriptionRequired])
      }
    ) 
    this.store.select(getResponseMessage).subscribe((data) => 
    {
      const { statusCode, msg } = data.response
      this.message = msg
      this.statusCode = statusCode
    })
  }
  
  ngOnInit(): void 
  {
    this.store.select(getSpinnerStatus).subscribe((data: any) => {
      // this.isLoading = status
    })
  }  

  // 2. Define data
  data = signal<Person[]>([
    { firstName: 'Tanner', lastName: 'Linsley', role: 'Admin', department: 'Sales' },
    { firstName: 'Stephen', lastName: 'Fresh', role: 'Super Admin', department: 'Director' },
    { firstName: 'Bimbo', lastName: 'Awomasun', role: 'Manager', department: 'Sales' },
    { firstName: 'Bright', lastName: 'Ben', role: 'Human Resource', department: 'Recruitment' },
    { firstName: 'Wasiu', lastName: 'Kehinde', role: 'Secretary', department: 'Reception' },
  ]);

  onConfirm = () => 
  {
     
  } 

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'firstName',
       header: 'First Name'
    },
    {
       accessorKey: 'lastName',
       header: 'Last Name'
    },
    {
       accessorKey: 'role',
       header: 'Role'
    },
    {
       accessorKey: 'department',
       header: 'Department'
    },
    {
       accessorKey: '...',
       header: 'Administer',
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
                 clickEvent: (value) => this.administer(value)
              }
            }
         )
       }       
    },
    // {
    //    accessorKey: '...',
    //    header: 'Change',
    //    cell: (context) => {
    //      return flexRenderComponent(
    //         EditComponent, {
    //           inputs: {
    //             value: context.getValue<number>()
    //           },
    //           outputs: {
    //             clickEvent: (value) => this.handleClick(value)
    //           }
    //         }
    //      )
    //    }       
    // },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
        
        //  const name: string = context.row.getValue('name')
        //  const description: string = context.row.getValue('description')
         const rowData: any =  { name: '', description: '' }

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
       accessorKey: 'firstName',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            DeleteComponent, {
              inputs: {
                value: context.getValue<string>()
              },
              outputs: {
                clickEvent: (value) => this.takeAction(value)
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

  closeModal()
  {
    
  }

  write()
  {

  }

  ToggleWithTitle(data: string)
  {

  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
      'background-color' : '#776005',
      'color': 'white',
      'padding': '20px'         
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '20px'        
    } 
  }
  
  userToggle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeStaff = true
  }  

  takeAction(data: string)
  {
     this.takeActionOnStaff = true
  }

  handleClick(value: string): void 
  {
    this.title = 'Update ...'
    this.buttonName = 'Save'
    this.isModalOpen = true
  } 

  change(value: any): void 
  {
     this.isModalOpen = true
  }  

  administer(value: number): void 
  {
     this.administring = true
  }


}




