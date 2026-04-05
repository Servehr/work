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
import { WriteLocalGovernmentComponent } from './write-local-government/write-local-government.component';

// 1. Define your data structure
type CountryData = { name: string; state: string, country: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-lga',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, RemoveComponent, WriteLocalGovernmentComponent],
  templateUrl: './lga.component.html',
  styleUrl: './lga.component.scss'
})
export class LgaComponent {

  PageTitle: string = 'Local Government'
  buttonName: string = ''
  writeLocalGovernment: boolean = false
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
    { name: 'Gbagada', state: 'Lagos', country: 'Nigeria' },
    { name: 'Surulere', state: 'Lagos', country: 'Nigeria' },
    { name: 'Festac', state: 'Lagos', country: 'Nigeria' },
    { name: 'Apapa', state: 'Lagos', country: 'Nigeria' },
    { name: 'Badagry', state: 'Lagos', country: 'Nigeria' },
  ]);

  onConfirm = () => 
  {
     
  } 

  ToggleWithTitle = (status: string) => 
  {
    this.title = status
    this.buttonName = 'Save'
    this.writeLocalGovernment = true
  }

  handleClick(value: number, action: string): void 
  {
     if(action === 'update')
     {
        this.title = 'Update Local Government Area'
        this.buttonName = 'Update'
        this.ToggleWithTitle(this.title)
     } else {
        this.isModalOpen = true
     }
  }  

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'name',
       header: 'Name'
    },
    {
       accessorKey: 'state',
       header: 'Name'
    },
    {
       accessorKey: 'country',
       header: 'Name'
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            EditComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => { 
                  this.handleClick(value, 'update')
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
                value: context.getValue<number>()
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

}



