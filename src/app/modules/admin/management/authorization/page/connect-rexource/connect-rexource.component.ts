import { Component, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';
import { LabelComponent } from '../../../../../../components/controls/label/label.component';
import { getAllRole } from '../../../../../../state/selectors/admin/management/role.selector';
import { LoaderComponent } from '../../../../../../components/loader/loader.component';
import { sleepWait } from '../../../../../../util/sleep';
import { START_REXOURCE } from '../../../../../../state/actions/management/rexource.actions';
import { getAllRexource } from '../../../../../../state/selectors/admin/management/rexource.selector';
import { CONNECT_PAGE_TO_RESOURCE } from '../../../../../../state/actions/management/page.actions';

@Component({
  selector: 'app-connect-rexource',
  standalone: true,
  imports: [BotinComponent, LabelComponent, LoaderComponent],
  templateUrl: './connect-rexource.component.html',
  styleUrl: './connect-rexource.component.scss'
})
export class ConnectRexourceComponent {

  private store = inject(Store<AppState>)
  
  @Input() title: string = ''
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter()
    
  pageTitle: string = ''
  isLoading = signal<boolean>(false)
  resources = signal<any>([])
  selectedPage = input<{ id: string, name: string}>({ id: '', name: '' })
  // happening = signal<string>('You are about to connect')
  message: string = ''
  statusCode!: number
  selectedRexourceId = signal<string>("")
  pageIds = signal<string>('')

  // pagination
  currentPage = signal<number>(1)
  perPage  = signal<number>(20)
  totalPages = signal<number>(5)
  totalDocs =  signal<number>(10)
  hasNextPage =  signal<boolean>(true)
  hasPrevPage =  signal<boolean>(true)

  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '20px'
  }

  @Input() options: { 'text': string, 'nos': number }[] = [
    { 'text': 'Staff', 'nos': 15 },
    { 'text': 'Managers', 'nos': 2 },
    { 'text': 'CSA', 'nos': 5 },
    { 'text': 'Riders Manager', 'nos': 4 },
    { 'text': 'Whare House Manager', 'nos': 3 },
    { 'text': 'Merchants', 'nos': 549 },
    { 'text': 'Riders', 'nos': 148 },
    { 'text': 'Accountant', 'nos': 1 }
  ]

  async ngOnInit()
  {
    this.store.dispatch(START_REXOURCE({ page: Number(this.currentPage()), limit: Number(this.perPage()) }))
    this.isLoading.set(true)    
    this.buttonName = 'Save'
    await sleepWait(500)      
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      if(data?.loader?.statusCode === 200)
      {
        this.isLoading.set(data?.loader?.loading)
      }
    }) 

    this.store.select(getAllRexource).subscribe((rexrc: any) => 
    {
      console.log(rexrc?.rexources)
      if(rexrc?.rexources)
      {
        console.log(rexrc?.rexources)
        this.isLoading.set(false)
        console.log(rexrc?.rexources)
        for (let index = 0; index < rexrc?.rexources?.length; index++) 
        {
          console.log(rexrc?.rexources[index])
          let selectedId = rexrc?.rexources[index]?._id
          console.log(selectedId)
          console.log(rexrc?.rexources[index]?.pages?.length)
          if(rexrc?.rexources[index]?.pages?.length > 0)
          {
             this.selectedRexourceId.set(selectedId)
          }
          rexrc?.rexources[index]?.pages?.map((page: any) => 
          {
             console.log(page?._id)
             this.pageIds.set(page?._id)
          })
          // if(rexrc?.rexources[index]?.pages?.legth > 0)
          // {
          //    console.log("@@@@@@@@@@@@@@@@@@22")
          //    console.log(rexrc?.rexources[index]?.pages)
          // }         
        }
        // rexrc?.rexources?.pages?.map((page: { _id: string }) => 
        //   {
        //      this.pageIds.update((p) => [...p, page?._id])
        //   }
        // )
        console.log("Selected Resource")
        console.log(this.selectedRexourceId())
        console.log(this.pageIds())
        console.log("Selected Resource")
        this.resources.set(rexrc?.rexources)
        this.currentPage.set(rexrc?.rexources?.pagination?.currentPage)
        this.totalPages.set(rexrc?.rexources?.pagination?.totalPages)
        this.hasPrevPage.set(rexrc?.rexources?.pagination?.hasPrevPage)
        this.hasNextPage.set(rexrc?.rexources?.pagination?.hasNextPage)
      }
    })    
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
  
  closeModal()
  {
    this.close.emit()
  }

  connectPageToResource = (rexource: string, pagee: string) => 
  {
     this.store.dispatch(CONNECT_PAGE_TO_RESOURCE({ resource: rexource, pagee: pagee, page: this.currentPage(), limit: this.perPage() }))
  }

  disconnect()
  {
    
  }

  write()
  {

  }

}
