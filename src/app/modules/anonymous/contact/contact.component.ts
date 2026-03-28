import { Component, computed, signal, TemplateRef } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  ColumnDef,
  FlexRenderDirective,
  createColumnHelper,
  FlexRenderComponent,
  flexRenderComponent
} from '@tanstack/angular-table';
import { AddComponent } from '../../../util/icons/add/add.component';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number };

// export const defaultColumns = (onCellClick: (data:any) => void) : ColumnDef<any>[] => [
//      columnHelper.accessor('firstName', {
//        header: 'Name',
//        cell: info => ({
//          TemplateRef: AddComponent,
//          contex
//        })
//      }) 
// ];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FlexRenderDirective, FormsModule, NgIcon],
  templateUrl: './contact.component.html',
  styles: [`
    .container {
      padding: 20px;
      font-family: sans-serif;
    }

    html {
      font-family: sans-serif;
      font-size: 14px;
    }

    table {
      border: 1px solid lightgray;
      width: 100%; /* Make table take full width of its container */
      border-collapse: collapse; /* Collapse borders for a cleaner look */
    }

    thead th {
      background-color: #343a40;
      color: white;
      border: 1px solid #454d55;
      padding: 0.75rem;
      text-align: left;
    }

    th {
      border-bottom: 1px solid lightgray;
      border-right: 1px solid lightgray;
      padding: 0.75rem;
      text-align: left;
    }

    tbody {
      border-bottom: 1px solid lightgray;
    }

    td {
      border: 1px solid #dee2e6;
      padding-top: 0.35rem;
      padding-bottom: 0.25rem;
      padding-right: 0.25rem;
      padding-left: 0.75rem;
    }

    tfoot {
      color: gray;
    }

    tfoot th {
      font-weight: normal;
    }

    .bg-light th {
      background-color: #f8f9fa;
    }

    .mt-3 {
      margin-top: 1rem;
    }

    .mr-2 {
      margin-right: 0.5rem;
    }

    .mb-2 {
      margin-bottom: 0.5rem;
    }

    .d-flex {
      display: flex;
    }

    .flex-wrap {
      flex-wrap: wrap; /* Allow pagination controls to wrap on smaller screens */
    }

    .align-items-center {
      align-items: center;
    }

    .justify-content-between {
      justify-content: space-between;
    }

    .d-inline-block {
      display: inline-block;
    }

    .w-auto {
      width: auto;
    }

    .ml-1 {
      margin-left: 0.25rem;
    }

    .mr-1 {
      margin-right: 0.25rem;
    }

    .form-control {
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .form-control-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.2rem;
    }

    .btn {
      display: inline-block;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      background-color: transparent;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      border-radius: 0.25rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .btn-primary {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    }

    .btn-primary:hover {
      color: #fff;
      background-color: #0056b3;
      border-color: #0056b3;
    }

    .btn-secondary {
      color: #fff;
      background-color: #6c757d;
      border-color: #6c757d;
    }

    .btn-secondary:hover {
      color: #fff;
      background-color: #545b62;
      border-color: #4e555b;
    }

    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.2rem;
    }

    /* Responsive adjustments */
    .table-responsive {
      overflow-x: auto; /* Enable horizontal scrolling for the table on smaller screens */
      margin-bottom: 1rem;
    }

    @media (max-width: 576px) {
      .justify-content-between {
        flex-direction: column; /* Stack pagination controls on very small screens */
        align-items: flex-start;
      }

      .justify-content-between > div {
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class ContactComponent {

  // 2. Define data
  data = signal<Person[]>([
    { firstName: 'Tanner', lastName: 'Linsley', age: 30 },
    { firstName: 'Kevin', lastName: 'Vandy', age: 28 },
  ]);


  handleClick(value: number): void {
     alert("Grace")
  }  

  columns: ColumnDef<any>[] = [
    {
       accessorKey: 'firstName',
       header: 'First Name'
    },
    {
       accessorKey: 'firstName',
       header: 'First Name',
       cell: (context) => {
         return flexRenderComponent(
            AddComponent, {
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


}
