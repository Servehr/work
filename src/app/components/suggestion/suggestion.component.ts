// search.component.ts
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, Observable, of } from 'rxjs';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, JsonPipe],
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit 
{
  searchControl = new FormControl('');
  suggestions$: Observable<string[]> = of([]);

  ngOnInit() {
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),          // Wait 300ms after last keystroke
      distinctUntilChanged(),     // Only search if the value actually changed
      switchMap(term => term ? this.fetchSuggestions(term) : of([])) // Cancel previous requests
    );
  }

  fetchSuggestions(term: string): Observable<string[]> {
    // Replace with an actual API call using HttpClient
    const mockData = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
    return of(mockData.filter(item => item.toLowerCase().includes(term.toLowerCase())));
  }

  selectSuggestion = (data: any) => 
  {

  }
}
