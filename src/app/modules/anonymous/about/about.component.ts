import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { sleepWait } from '../../../util/sleep';
import { START_ABOUT } from '../../../state/actions/cms/about.actions';
import { getAboutUs } from '../../../state/selectors/admin/cms/about.selector';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  private store = inject(Store<AppState>) 
   
  isLoading = signal<boolean>(false)

  content = signal<any>([])

  

  async ngOnInit()
  {    
    this.isLoading.set(true)    
    this.store.dispatch(START_ABOUT())
    await sleepWait(1000)

    this.store.select(getAboutUs).subscribe((data: any) => 
    {
      this.isLoading.set(data?.loader?.loading)
      console.log(data?.aboutus?.about)
      this.content.set(data?.aboutus?.about)
    })    
  }   


  //     // 1. Convert store selectors directly into read-only signals
  // private aboutUsState = toSignal(this.store.select(getAboutUs));

  // // 2. Derive your UI values reactively using computed signals
  // content = computed(() => this.aboutUsState()?.aboutus?.aboutus);
  // isLoading = computed(() => this.aboutUsState()?.loader?.loading ?? false);

  // ngOnInit() {    
  //   // 3. Keep ngOnInit purely for triggering the initial side-effect
  //   this.store.dispatch(START_ABOUT());
  // }

}
