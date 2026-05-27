import { Component, computed, effect, input, output, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { LOAD_DIVISIONS } from '../../../../../../state/actions/management/division.actions.';
import { getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { getAllDivision } from '../../../../../../state/selectors/admin/management/division.selector';
import { LoaderComponent } from '../../../../../../components/loader/loader.component';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { WriteDivisionComponent } from '../write-division/write-division.component';
import { sleepWait } from '../../../../../../util/sleep';
import { RemoveDivisionComponent } from '../remove-division/remove-division.component';

@Component({
  selector: 'app-division',
  standalone: true,
  imports: [LoaderComponent, NgIcon, ModalComponent, WriteDivisionComponent, RemoveDivisionComponent],
  templateUrl: './division.component.html',
  styleUrl: './division.component.scss'
})
export class DivisionComponent {

  
  PageTitle = signal<string>('Divisions')
  buttonName = input<string>('')
  category = input<string>("-1")
  categoryDivision = signal<any>([])
  addIcon: any = bootstrapPlusCircleFill
  openDivision = signal<boolean>(false)
  modalWidth: string = 'w-[900px]'
  refresh = output()
  path = signal<string>('')
  division = signal<string>('')
  action = signal<string>('[retrieve divisions] division posting')
  isOpen = signal<boolean>(false)  
  removeData = signal<any>(null)
  dataToUpdate = signal<any>(null)

  // pagination
  currentPage = signal<number>(1)
  perPage  = signal<number>(10)
  isLoading = signal<boolean>(false)
  totalPages = signal<number>(5)
  totalDocs =  signal<number>(10)
  hasNextPage =  signal<boolean>(true)
  hasPrevPage =  signal<boolean>(true)

  loading = computed(() => this.isLoading())

  constructor(private store: Store<AppState>){}

  async ngOnInit()
  {
    this.store.select(getSpinnerStatus).subscribe((data: any) => 
    {
      if(data?.loader?.statusCode === 200)
      {
        this.isLoading.set(data?.loader?.loading)
        this.isOpen.set(false)
      }
    }) 

    this.store.select(getAllDivision).subscribe((divs: any) => 
    {
      if(divs?.divisions)
      {
        this.isLoading.set(false)
        this.categoryDivision.set(divs?.divisions)
        this.currentPage.set(divs?.divisions?.pagination?.currentPage)
        this.totalPages.set(divs?.divisions?.pagination?.totalPages)
        this.hasPrevPage.set(divs?.divisions?.pagination?.hasPrevPage)
        this.hasNextPage.set(divs?.divisions?.pagination?.hasNextPage)
      }
    })    
  }  

  ngAfterViewInit(): void 
  {
    this.isLoading.update((update) => !update)
  }

  async ngOnChanges(changes: SimpleChanges)
  {
    if(changes['category'])
    {
      await sleepWait(500)
      if(changes['category']['previousValue'] != this.category() && this.category() != "-1")
      {
        console.log(this.currentPage())
        this.store.dispatch(LOAD_DIVISIONS({ category: this.category(), page: Number(this.currentPage()), limit: Number(this.perPage()) }))
      }
    }
  }

  create = (title: string) => 
  {
    this.PageTitle.set(title)
    this.openDivision.set(true)
  }

  modify = (data: any, currentPage: number) => 
  {
    this.dataToUpdate.set(data)
    this.openDivision.set(true)
  }

  closeModal = () => 
  {
    this.openDivision.set(false)
  }

  onConfirm = () => 
  {
  }

  remove(value: string): void 
  {
    this.PageTitle.set('Delete Division')
    // this.division.set(value)
    // '[retrieve divisions] division posting'
    // this.removeData.set({ path: 'division/remove', division: value, action: this.action() })
    this.removeData.set({ division: value })
    this.isOpen.set(true)
  }

  refershWindow = () => 
  {
    this.store.dispatch(LOAD_DIVISIONS({ category: this.category(), page: Number(this.currentPage()), limit: Number(this.perPage()) }))
  }

  close = () => 
  {
     this.isOpen.set(false)
  }


}
