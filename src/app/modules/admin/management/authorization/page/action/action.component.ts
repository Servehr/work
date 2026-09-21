import { Component, EventEmitter, input, Input, model, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { WriteActionComponent } from '../write-action/write-action.component';
import { RemoveComponent } from '../../../../../../shared/remove/remove.component';
import { getAllAktions } from '../../../../../../state/selectors/admin/management/aktion.selector';
import { START_PAGE_AKTION } from '../../../../../../state/actions/management/page.actions';
import { RemoveActionComponent } from '../remove-action/remove-action.component';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [ModalComponent, WriteActionComponent, RemoveComponent, RemoveActionComponent],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent implements OnInit {

  title: string = 'Create Action'
  isLoading = signal<boolean>(false)
  @Input() buttonName: string = ''
  writeRexource: boolean = false
  theCurrentPage = input<string>('')
  toRemove = signal<any>(null)
  dataToUpdate = signal<any>(null)
  addIcon: any = bootstrapPlusCircleFill

  ////////////   
  PageTitle: string = 'Page Actions'
  pageAction = signal<boolean>(false)
  pageActionDelete: boolean = false
  isModalOpen: boolean = false
  modalWidth: string = 'w-[750px]'
  //////////////////////

   value: string = ''
   rows: number = 3
   

   actions = signal<any>([])
  
   errorMessages = 
   { 
     roleName: 'Enter name for action', 
     note: 'Enter description for action'
   }

   @Input() ModalState: string = ''
   @Input() UpperModalState: string = ''
   @Output() FromPackage: EventEmitter<string> = new EventEmitter()

   newAction: FormGroup;
      
   constructor(private store: Store<AppState>)
   { 
     this.newAction = new FormGroup(
        {
          actionName: new FormControl('', [Validators.required]),
          note: new FormControl('', [Validators.required])
        }
     )    
   }

   ngOnInit(): void 
   {
      this.store.select(getAllAktions).subscribe((data: any) => 
      {
        if(data?.fromPlace?.location === 'pageAction')
        {
           this.actions.set(data)
        }
      })    
   }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['theCurrentPage'] && changes['theCurrentPage']['previousValue'] !== undefined || changes['theCurrentPage']['firstChange'] === true)
    {      
      this.isLoading.set(true)
      this.showActions(this.theCurrentPage())
    }
  }    

  showActions = (page: string) => 
  {console.log("I dispatched")
    this.store.dispatch(START_PAGE_AKTION({ page: page }))
  }  

  updateAction = (action: any) => 
  {
    this.dataToUpdate.set(action)
    this.pageAction.set(true)
  }

  closeActionModal = () => 
  {
    this.pageAction.set(false)
  }

  CloseModal()
  {
    this.ModalState = ''
    this.FromPackage.emit('')     
  }

  CloseCurrentModal()
  {
    this.UpperModalState = ''
   //  this.FromPackage.emit('')
  }

  close = () => 
  {
    console.log("8*****************8")
    this.pageActionDelete = false
    this.toRemove.set(null)
    this.showActions(this.theCurrentPage())
  }
   
  removeAction(action: any)
  {
    this.toRemove.set(action)
    this.pageActionDelete = true
  }

}
