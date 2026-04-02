import { Component, computed, EventEmitter, Input, Output, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  FlexRenderComponent,
  flexRenderComponent
} from '@tanstack/angular-table';
import { EditComponent } from '../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../util/icons/delete/delete.component';
import { ViewComponent } from '../../../util/icons/view/view.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TakeActionOnStaffComponent } from '../../../shared/take-action-on-staff/take-action-on-staff.component';
import { ViewInfoComponent } from '../../../shared/view-info/view-info.component';
import { LabelComponent } from '../../../components/controls/label/label.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number, gender: string };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, TakeActionOnStaffComponent, ViewInfoComponent, LabelComponent], // Import necessary modules
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {

  PateTitle: string = 'Vendors'
  @Input() title: string = ''
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter()

  takeActionOnStaff: boolean = false
  viewingInfo: boolean = false

  // 2. Define data
  data = signal<Person[]>([
    { firstName: 'Tanner', lastName: 'Linsley', age: 30, gender: 'Female' },
    { firstName: 'Stephen', lastName: 'Fresh', age: 30, gender: 'Male' },
    { firstName: 'Bimbo', lastName: 'Awomasun', age: 19, gender: 'Male' },
    { firstName: 'Bright', lastName: 'Ben', age: 20, gender: 'Female' },
    { firstName: 'Wasiu', lastName: 'Kehinde', age: 28, gender: 'Female' },
  ]); 

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
       accessorKey: 'age',
       header: 'Age'
    },
    {
       accessorKey: 'gender',
       header: 'Gender'
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            ViewComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.viewUser(value)
              }
            }
         )
       }       
    },
    {
       accessorKey: '...',
       header: '',
       cell: (context) => {
         return flexRenderComponent(
            DeleteComponent, {
              inputs: {
                value: context.getValue<number>()
              },
              outputs: {
                clickEvent: (value) => this.handleClick(value)
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

  handleClick(value: number): void 
  {
     this.takeActionOnStaff = true
  } 

  viewUser(value: number)
  {
    this.viewingInfo = true
  }

  onConfirm = () => 
  {
     
  } 


}


