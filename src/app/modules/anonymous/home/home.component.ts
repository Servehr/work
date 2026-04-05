import { Component, Inject, OnInit } from '@angular/core';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { liveQuery } from 'dexie';
import { DatabaseService } from '../../../service/db/database.service';
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { bootstrapXCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { Router } from '@angular/router';
import { SuggestionComponent } from '../../../components/suggestion/suggestion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, InputFieldComponent, BotinComponent, AsyncPipe, KeyValuePipe, NgFor, NgIcon, SuggestionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit
{
   users$ = liveQuery(() => this.dbService.getUser())
   disabled: boolean = false
   close: any =  bootstrapXCircleFill
   style: any = {
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '20px'
   }

   private router = Inject(Router)

   constructor(private dbService: DatabaseService){}

   ngOnInit() 
   {
      // this.addNewList()
      // this.dbService.removeUser()
      // console.log(this.users$)
      // console.log(this.dbService.getUser())
      // console.log(this.router?.url)
      // console.log(window.location.hostname)
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

   search()
   {

   }

   async addNewList() 
   {
      const user: {
         userId: string, 
         firstname: string, 
         surname: string
         token: string
      } = {
         userId: "1",
         firstname: 'Mohammed',
         surname: 'Dumar Wright +',
         token: "PODfdfdfdf"
      }      
      await this.dbService.newUser(user)
   }

}
