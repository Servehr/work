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
  suggestForm: FormGroup;
  userWord = model<string>('')
  isSearching =  signal<boolean>(false)
  results = signal<any>([])
  suggest = input<any[]>()
  divisions = output<{ divisions: any, id: string }>()
  showSuggestion = signal<boolean>(false)

  constructor(private store: Store<AppState>) 
  { 
    this.suggestForm = new FormGroup(
     {
        keyword: new FormControl('')
     }
    )

    effect(() => 
    {
       
    })
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
    this.suggestForm.get('typeKey')?.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
    ).subscribe((value: string) => {
        this.suggestForm.patchValue(
         {
           typeKey: value
         }
        )
        this.isSearching.set(true)
        if(value?.length > 0)
        {
          const category: string = 'category'
          this.store.dispatch(START_SUGGESTION({ url: category }))
        } else {
          this.isSearching.set(false)
          // this.result.set([])
        }
      })    
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['suggest'])
    {
       this.results.set(changes['suggest'].currentValue?.data)
       console.log(this.suggest())
       console.log(changes['suggest'].currentValue?.data)
    }
  }

  closeList = () => 
  {
     
  }

  openUp = () => 
  {
     this.showSuggestion.update((decide) => !decide)
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
