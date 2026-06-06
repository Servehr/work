import { Component, Inject, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA, inject, input, Input  } from '@angular/core';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { liveQuery } from 'dexie';
import { DatabaseService } from '../../../service/db/database.service';
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { bootstrapEyeFill, bootstrapStarFill, bootstrapThreeDotsVertical, bootstrapXCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { SuggestionComponent } from '../../../components/suggestion/suggestion.component';
import { UserCardComponent } from '../../../components/user-card/user-card.component';
import { ImageComponent } from '../../../components/controls/image/image.component';
import { TestimonialComponent } from '../../../components/testimonial/testimonial.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { NewsletterComponent } from '../../section/newsletter/newsletter.component';
import { ToastrService } from 'ngx-toastr';
import { SkillSearchComponent } from './skill-search/skill-search.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { FastResponseFormComponent } from './fast-response-form/fast-response-form.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { CarouselSwiperComponent } from './carousel-swiper/carousel-swiper.component';
import { TopEngagersComponent } from './top-engagers/top-engagers.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
               NgIf, NgFor, AsyncPipe, KeyValuePipe, NgFor, NgIcon, ReactiveFormsModule,
               InputFieldComponent, BotinComponent, SuggestionComponent, SkillSearchComponent, ModalComponent, CarouselSwiperComponent,
               UserCardComponent, ImageComponent, TestimonialComponent, TopEngagersComponent, NewsletterComponent, WhatsappComponent, FastResponseFormComponent                
            ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit
{
   users$ = liveQuery(() => this.dbService.getUser())
   toastr = inject(ToastrService)
   disabled: boolean = false
   close: any =  bootstrapXCircleFill
   view: any = bootstrapEyeFill
   threeDot: any = bootstrapThreeDotsVertical  // remove
   rating: any = bootstrapStarFill             // remove
   modalWidth = signal<string>('w-[750px]')
   openFastForm = signal<boolean>(false)

   subscribe: FormGroup;
   style: any = {
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '20px'
   }
   
   isHamburgOver: boolean = false

   errorMessages = 
   { 
      required: 'Enter email',
      email: 'Enter a valid email'
   }   

   users = signal([
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Moham",
       surname: "Wright",
       skills: ['Painter', 'Screeding'],
       rating: 5,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Moham",
       surname: "Wright",
       skills: ['Painter', 'Screeding'],
       rating: 5,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Moham",
       surname: "Wright",
       skills: ['Painter', 'Screeding'],
       rating: 5,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Blessing",
       surname: "Favour",
       skills: ['Cleaning', 'Rubbing'],
       rating: 2,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Stephen",
       surname: "Phillip",
       skills: ['Washer', 'Dryer'],
       rating: 4,
       status: 'active'
     },
     {
       id: "1",
       image: '../../../../../man.jpg',
       alt: '',
       firstname: "Mustapha",
       surname: "Martins",
       skills: ['Electrician', 'Wiring'],
       rating: 3,
       status: 'inactive'
     }
   ])

   sliders = signal([
     "https://ps.w.org/ml-slider/assets/banner-1544x500.png?rev=2907610",
     "https://cdn2.mageplaza.com/media/general2/H4BvhSS.jpg"
      
   ])


   constructor(private store: Store<AppState>, private dbService: DatabaseService) 
   { 
     this.subscribe = new FormGroup(
        {
           email: new FormControl('', [Validators.required, Validators.email])
        }
      )
   }       

   ngOnInit() 
   {
      // this.addNewList()
      // this.dbService.removeUser()
      // console.log(this.users$)
      // console.log(this.dbService.getUser())
      // console.log(this.router?.url)
      // console.log(window.location.hostname)
   }

   harmburger()
   {       
   //   this.openMobileNav = !this.openMobileNav;
   }

   overBurger()
   {
      this.isHamburgOver = !this.isHamburgOver
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

   sendFastForm = () => 
   {
      this.openFastForm.set(true)
   }  

   closeForm = () => 
   {
      this.openFastForm.set(false)
   }

}
