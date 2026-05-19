import { Component, computed, signal, TemplateRef } from '@angular/core';
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
import { ViewComponent } from '../../../../util/icons/view/view.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { LgaComponent } from './lga/lga.component';

// 1. Define your data structure
type Person = { firstName: string; lastName: string; age: number, gender: string };

const columnHelper = createColumnHelper<any>();

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [FlexRenderDirective, ModalComponent, NgClass, CountryComponent, StateComponent, LgaComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

  pageTitle:string = 'User Management'
  page: number = -1
  level: string = 'Management'

  location: number = -1
  roles:any[] = [
    { id: 'admin', name:'Admin' },
    { id: 'manager', name:'Manager' },
    { id: 'secretary', name:'Secretary' }
  ] 
  resource: {  id: number, name: string } = { id: -1, name: "" }
  locations:any[] = [
    { id: 0, name:'Country' },
    { id: 1, name:'State' },
    { id: 2, name:'LGA' }
  ] 

  roleForm: FormGroup;    

  constructor()
  {
    this.roleForm = new FormGroup(
    {
      role: new FormControl('', [Validators.required])
    }) 
  }
    
  GoToPage(page: number)
  {
     this.location = page
  }



}



