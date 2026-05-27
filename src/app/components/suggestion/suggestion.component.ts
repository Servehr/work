// search.component.ts
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, effect, input, model, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, Observable, of } from 'rxjs';
import AppState from '../../state/app.state';
import { Store } from '@ngrx/store';
import { SERARCH_USER } from '../../state/actions/user.actions';
import { START_SUGGESTION } from '../../state/actions/suggestion.actions';
import { getSearchSugesstions } from '../../state/selectors/suggestion.selector';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, JsonPipe],
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class    SuggestionComponent implements OnInit 
{
  searchControl = new FormControl('');
  suggestions$: Observable<string[]> = of([]);
  searchForm: FormGroup;
  userWord = model<string>('')
  isSearching =  signal<boolean>(false)
  results = signal<any>([])
  keep = signal<any>([])
  suggest = input<any[]>()
  divisions = output<{ divisions: any, id: string }>()
  showSuggestion = signal<boolean>(false)
  keyword: string = ''

  constructor(private store: Store<AppState>) 
  { 
    this.searchForm = new FormGroup(
     {
        searchKey: new FormControl('')
     }
    )
  }

  ngOnInit() 
  {
    // this.suggestions$ = this.searchControl.valueChanges.pipe(
    //   debounceTime(300),          // Wait 300ms after last keystroke
    //   distinctUntilChanged(),     // Only search if the value actually changed
    //   switchMap(term => term ? this.fetchSuggestions(term) : of([])) // Cancel previous requests
    // );

    this.store.select(getSearchSugesstions).subscribe((search: any) => 
    {
        console.log(search)
    }) 

    this.showSuggestion.set(false)
    this.searchForm.get('searchKey')?.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
    ).subscribe((value: string) => {
        // this.searchForm.patchValue(
        //  {
        //    searchKey: value
        //  }
        // )
        this.isSearching.set(true)
        console.log(value)
        if(value?.length > 0)
        {
          // this.results.set([])
          const search = this.results().filter((result: any) => result?.name?.toLowerCase().includes(value.toLowerCase()))
          // this.showSuggestion.set(true)
          this.results.set(search)
        } else {
          this.isSearching.set(false)
          this.results.set(this.keep())          
          this.divisions.emit({ divisions: [], id: "-1" })
        }
      })    
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['suggest'])
    {
       this.results.set(changes['suggest'].currentValue?.data)
       this.keep.set(changes['suggest'].currentValue?.data)
       console.log(this.suggest())
       console.log(changes['suggest'].currentValue?.data)
       this.divisions.emit({ divisions: [], id: "-1" })
       this.userWord.set('')
    }
  }

  closeList = () => 
  {
     
  }

  openUp = () => 
  {
     this.showSuggestion.update((decide) => !decide)
     if(this.showSuggestion() === false && this.userWord().length === 0)
     {
       this.divisions.emit({ divisions: [], id: "-1" })
     }
  }

  select = (selected: { _id: string, name: string, description: string, divisions: any }) => 
  {
      this.userWord.set(selected.name?.charAt(0).toUpperCase() + selected.name?.slice(1).toLowerCase())
      this.showSuggestion.update((decide) => !decide)
      this.divisions.emit({ divisions: selected.divisions, id: selected._id })
  }

  fetchSuggestions(term: string): Observable<string[]> 
  {
    // Replace with an actual API call using HttpClient
    const mockData = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
    return of(mockData.filter(item => item.toLowerCase().includes(term.toLowerCase())));
  }

  selectSuggestion = (data: any) => 
  {

  }
}
