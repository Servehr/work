import { Component, computed, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { EditComponent } from '../../../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../../../util/icons/delete/delete.component';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { NgIcon } from '@ng-icons/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { RemoveComponent } from '../../../../../shared/remove/remove.component';
import { BoteenComponent } from '../../../../../util/icons/boteen/boteen.component';
import { WriteStateComponent } from './write-state/write-state.component';
import { StateLocalGovernmentComponent } from './state-local-government/state-local-government.component';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';

// 1. Define your data structure
type StateData = { name: string; country: string, no_of_lga: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, RemoveComponent, WriteStateComponent, StateLocalGovernmentComponent, BotinComponent],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent {

  PageTitle: string = 'States'
  buttonName: string = ''
  writeState: boolean = false
  isCountryLocalGovernment: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  isModalOpen: boolean = false
  title: string = ''
  modalWidth: string = 'w-[700px]'

  boteenStyle: any = {
    'color': 'black',
    'border': '2px solid #3e4095',
    'border-radius': '10px'
  }
  linkCss: string = "text-black border-2 bg-gray-200 hover:bg-[#3e4095] hover:text-white"
  unLinkCss: string = "text-black border-2 bg-yellow-200 hover:bg-gray-600 hover:text-white"
  boteeName: string = 'Link'

  // 2. Define data
  data = signal<StateData[]>([
    { name: 'Abuja', country: 'Nigeria', no_of_lga: '40' },
    { name: 'Tehran', country: 'Iran', no_of_lga: '32' },
    { name: 'Moscow', country: 'Russia', no_of_lga: '19' },
    { name: 'Korea', country: 'North Korea', no_of_lga: '43' },
    { name: 'Beiging', country: 'China', no_of_lga: '10' },
  ]);

  onConfirm = () => 
  {
     
  }  

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'Name'
    },
    {
       accessorKey: 'country',
       header: 'Country'
    },
    {
       accessorKey: 'no_of_lga',
       header: 'No-of-LGA',
       cell: (context) => {
          return flexRenderComponent(
            BoteenComponent, {
              inputs: {
                 value: context.getValue<{ count: number, data: any }>(),
                 boteenStyle: this.boteenStyle,
                 boteeName: context.getValue<number>(),
                 boteenCssClass: this.unLinkCss,
              },
              outputs: {
                 clickEvent: (value) => this.countryState(value)
              }
            }
          )
        }
    },
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
                clickEvent: (value) => this.handleClick(value, 'delete')
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

  countryState(status: number): void
  {
    this.title = 'Page Action'
    this.buttonName = 'Save'
    this.isCountryLocalGovernment = true     
  }

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeState = true
  }

  handleClick(value: string, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update State'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
  } 
  
  change(value: any): void 
  {
     this.isModalOpen = true
  } 

}



