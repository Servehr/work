import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../state/app.state';
import { getSearchSugesstionKeyword } from '../../state/selectors/suggestion.selector';
import { START_SUGGESTION } from '../../state/actions/suggestion.actions';
// import { SuggestedProductNames } from 'src/app/state/actions/product.action';
// import { getProductNamesToSearchFor } from 'src/app/state/selector/product.selector';


@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [],
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

    @Input() type:string = ''
    @Input() name:string = ''
    @Input() id:string = ''
    @Input() placeholder:string = ''
    @Input() value:any = ''
    @Input() disabled:boolean = false
    @Output() inputedData: EventEmitter<string | Date> = new EventEmitter()
    @Output() keywordData: EventEmitter<string> = new EventEmitter()
    @Output() productSuggestion: EventEmitter<string> = new EventEmitter()
    @Input() page:string = ''

    autosearch: boolean = false
    incomingData: string = ''
    message: string = ''
    /* @ignore */
    ProductNames: any[] = []
    searchClass: string = ''
    noProduct: boolean = false

    constructor(private store: Store<AppState>){}

    ngOnInit(): void {
      this.id = 'staffss'
      this.store.select(getSearchSugesstionKeyword).subscribe((data: any) => 
      {
          if(data.productNames.length > 0)
          {
            this.searchClass = "h-[200px] overflow-y-auto absolute w-full"
            this.autosearch = true
            this.ProductNames = data.productNames
            this.noProduct = false
          } else {
              this.noProduct = true
              this.ProductNames = data.productNames              
          }
      })
    }

    /* @ignore */
    closeUlTag = (productName: string) => 
    {
        this.value = productName
        this.id = 'xxx'
        this.autosearch = false
        this.ProductNames = []
        console.log(this.autosearch)
    }

    isItStaff = () => 
    {    
      return this.id === 'staffs'
    }

    suggestionMessage = () => 
    {
        if(this.value != "" || this.value != null)
        {
            if(this.ProductNames.length === 0)
            {
                this.noProduct = true
                console.log("XXXXXXXXXXXX")
                return false
            } else {
              console.log("YYYYYYYYYY")
                return true
            }
        } else {
          console.log("aaaaaaaaaaaa")
          return false
        }
    }

    validateInput(data: any)
    {
        this.incomingData = data.target.value
        if(this.type === "text")
        {
          this.processText(this.incomingData)
        }

        if(this.type === "date")
        {
            this.processDate(data.target.value)
        }

        if(this.type === "email")
        {
            this.processDate(data.target.value)
        }
    }

    processText = (data: string) => 
    {
        this.message = ""
        switch (this.name) 
        {
          case 'firstname':
              if(this.incomingData.length > 20)
              {
                  this.message = 'Text cannot be greater than 20'
                  return
              } else {
                this.inputedData.emit(this.incomingData)
              }
            break;       
          default:
            this.inputedData.emit(data)
            break;
        }
    }

    processDate = (data: Date) => 
    {        
       this.inputedData.emit(data)
    }
    
    /* @ignore */
    dataSuggestion = (keyword: any) => 
    {
        const word: string = keyword.target.value
        console.log(word)
        this.store.dispatch(START_SUGGESTION({ keyword: word }))
    }

}

