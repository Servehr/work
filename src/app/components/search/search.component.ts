import { Component, computed, EventEmitter, input, model, OnInit, Output, output, signal } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { SERARCH_USER } from '../../state/actions/user.actions';
import { getResponseMessage, getSpinnerStatus } from '../../state/selectors/spinner.selector';
import { getProfile } from '../../state/selectors/admin/user.action';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { sleepWait } from '../../util/sleep';

interface UserSearch 
{
  _id: string
  firstname: string
  surname: string
  profilePicture: string
}

// { _id: string, firstname: string, surname: string, profilePicture: string }

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LoaderComponent, ReactiveFormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

    suggestForm: FormGroup
    enableViewResults = input<boolean>(false)

    isSearching: boolean = false
    results: any = null
    keyword: string = ''
    status: number = 0
    noResult: string = ''
    @Output() selected = new EventEmitter<string>()

    
    constructor(private store: Store<AppState>) 
    { 
       this.suggestForm = new FormGroup(
         {
           typeKey: new FormControl('')
         }
       )
    }

    ngOnInit(): void 
    {
      this.isSearching = false
      this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
          // this.isSearching = data?.loader?.loading
      })
      this.store.select(getProfile).subscribe((data) => 
        {
           if(data?.profile?.length > 0)
           {            
              this.results = data?.profile
              this.status = 200
           }
           if(data?.profile?.length === 0)
           {            
              this.results = []
              this.noResult = `No result found for ${this.keyword}`
              this.status = 400
           }

        }
      )
      
      this.suggestForm.get('typeKey')?.valueChanges
      .pipe(
          debounceTime(500),
          distinctUntilChanged()
      ).subscribe(async (value: string) => {
          this.suggestForm.patchValue(
            {
              typeKey: value
            }
          )
          this.noResult = ''
          this.results = []
          this.keyword = value
          if(value.length > 2)
          {
            this.isSearching = true
            await sleepWait(3000)
            this.status = 0
            this.store.dispatch(SERARCH_USER({ keyword: value }))
          } else {
            this.isSearching = false
            this.results = []
          }
      })
    }

    openUp = () =>
    {
      
    }

    select(value: {_id: string, firstname: string, surname: string })
    {
      const fullname: string = value?.firstname + ' ' + value?.surname
      this.keyword = fullname
      this.isSearching = false
      this.results = []
      this.selected.emit(value?._id)       
    }

}
