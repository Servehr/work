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
import { ViewComponent } from '../../../../../util/icons/view/view.component';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { NgIcon } from '@ng-icons/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { RemoveComponent } from '../../../../../shared/remove/remove.component';
import { WriteCountryComponent } from './write-country/write-country.component';
import { BoteenComponent } from '../../../../../util/icons/boteen/boteen.component';
import { CountryStateComponent } from './country-state/country-state.component';

// 1. Define your data structure
type CountryData = { name: string; no_of_state: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, WriteCountryComponent, RemoveComponent, CountryStateComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {

  PageTitle: string = 'Countries'
  buttonName: string = ''
  writeCountry: boolean = false
  isCountryState: boolean = false
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
  data = signal<CountryData[]>([
    { name: 'Nigeria', no_of_state: '40' },
    { name: 'Iran', no_of_state: '32' },
    { name: 'Russia', no_of_state: '19' },
    { name: 'North Koria', no_of_state: '43' },
    { name: 'China', no_of_state: '10' },
  ]);

  onConfirm = () => 
  {
     
  } 

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeCountry = true
  }

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'Name'
    },
    {
       accessorKey: 'no_of_state',
       header: 'No-of-State',
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
    this.isCountryState = true     
  }

  handleClick(value: string, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Category'
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



