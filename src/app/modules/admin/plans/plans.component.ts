import { Component, computed, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  flexRenderComponent
} from '@tanstack/angular-table';
import { ModalComponent } from '../../../components/modal/modal.component';
import { DeleteComponent } from '../../../util/icons/delete/delete.component';
import { EditComponent } from '../../../util/icons/edit/edit.component';
import { NgIcon } from '@ng-icons/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { WritePlanComponent } from './write-plan/write-plan.component';

// 1. Define your data structure
type Person = { type: string }

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgIcon, WritePlanComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {

  PageTitle: string = 'Plans'
  planUp: boolean = false
  title: string = 'Plan'
  
  isModalOpen: boolean = false
  modalWidth: string = 'w-[850px]'
  addIcon: any = bootstrapPlusCircleFill

  // 2. Define data
  data = signal<Person[]>([
    { type: 'Basic'  },
    { type: 'Classic' },
    { type: 'Premium'  },
    { type: 'Ultimate' }
  ]);

  onConfirm = () => 
  {
     
  }

  removeOperation(value: number): void 
  {
     this.isModalOpen = true
  }

  writeOperation(value: number): void 
  {
     this.planUp = true
  }  

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'type',
       header: 'Type'
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
                clickEvent: (value) => this.writeOperation(value)
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
                clickEvent: (value) => this.removeOperation(value)
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


}


