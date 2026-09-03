import { Component, effect, inject, input, signal } from '@angular/core';
import { WysiwygComponent } from '../../../../library/wysiwyg/wysiwyg.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { SetLoadingStatus } from '../../../../state/actions/spinner.action';
import { CREATE_ABOUT, START_ABOUT, UPDATE_ABOUT } from '../../../../state/actions/cms/about.actions';
import { sleepWait } from '../../../../util/sleep';
import { getAboutUs } from '../../../../state/selectors/admin/cms/about.selector';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { AddComponent } from '../../../../util/icons/add/add.component';
import { RemoveAboutComponent } from './remove-about/remove-about.component';
import { WriteAboutComponent } from './write-about/write-about.component';
import { EditComponent } from '../../../../util/icons/edit/edit.component';
import { DeleteComponent } from '../../../../util/icons/delete/delete.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AddComponent, RemoveAboutComponent, DeleteComponent, EditComponent, DeleteComponent, WriteAboutComponent, WysiwygComponent, BotinComponent, LoaderComponent, ModalComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  sectionTitle: string = "About Us"
  tellUs = signal<boolean>(false)
  modalWidth: string = 'w-[450px]'
  about = signal<any>([])
  buttonName = signal<any>(null)
  administring: boolean = false
  isLoading = signal<boolean>(false)
  removeWriteAbout = signal<boolean>(false)
  dataToRemove = signal<string>('')
  dataToUpdate = signal<any>(null)
  disabled: boolean = false
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '14px 20px 14px 20px'
  }  

  constructor(private store: Store<AppState>)
  {
    // effect(() => 
    // {
    //    this.dataToUpdate() 
    // }) 
  } 

  tellMe = () => 
  {
    this.buttonName.set('Save')
    this.tellUs.set(true)
  }

  modifyAbout = (rowData: any) => 
  {
    this.buttonName.set('Update')
    this.tellUs.set(true)
    this.dataToUpdate.set(rowData)
  }

  removeData = (data: any) => 
  {
     console.log(data)
     this.dataToRemove.set(data)
     this.removeWriteAbout.set(true)
  }

  closeRemove = () => 
  {
    this.removeWriteAbout.set(false)
  }

  // remove(value: string): void 
  // {
  //   // this.title = 'Delete Category'
  //   // this.buttonName = 'Remove'
  //   this.removeData.set({ category: value, currentPage: this.currentPage(), pagePage: this.perPage() })
  //   this.isModalOpen = true
  // }   

  async ngOnInit()
  {    
    this.isLoading.set(true)    
    this.store.dispatch(START_ABOUT())
    this.buttonName.set('Save')
    await sleepWait(1000)

    this.store.select(getAboutUs).subscribe((data: any) => 
    {
      this.isLoading.set(data?.loader?.loading)
      this.buttonName.set('Update')
      this.about.set(data?.aboutus?.about)
      console.log(data?.aboutus?.about)
      // this.content.set(data?.aboutus?.aboutus)
    })    
  }

  contentData = (data: any) => 
  {
    //  this.content.set(data)
  }

  ChangeOnButtonHoverIn()
  {
     this.style = {
     'background-color' : '#776005',
     'color': 'white',
     'padding': '14px 20px 14px 20px' 
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '14px 20px 14px 20px'  
    } 
  }

  writeAboutMe = () => 
  {
     this.tellUs.set(true)
  }

  closeAboutMe = () => 
  {
    console.log("Beautiful")
    this.tellUs.set(false)    
  }

  // closeRemove = () => 
  // {
  //    this.removeWriteAbout.set(false)
  // }

  onConfirm = () => 
  {
     
  } 

}
