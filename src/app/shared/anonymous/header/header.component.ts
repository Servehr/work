import { Component, inject, OnInit, signal, SimpleChanges } from '@angular/core';
import { LogoComponent } from '../../../components/logo/logo.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapList, bootstrapXLg, bootstrapGrid1x2Fill, bootstrapHouseDoorFill, bootstrapFacebook, bootstrapTwitter, bootstrapInstagram, bootstrapYoutube, bootstrapTiktok, bootstrapPersonFill, bootstrapPersonPlusFill, bootstrapPower } from '@ng-icons/bootstrap-icons';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { delay, from, of, Subscription, switchMap, timer } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { getUserToken } from '../../../state/selectors/auth.selector';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { DatabaseService } from '../../../service/db/database.service';
import { PASS_THE_TOKEN } from '../../../state/actions/auth.actions';
import { BroadcastService } from '../../../service/util/broadcast.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { PostComponent } from '../../../modules/user/post/post.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
              CommonModule, NgIcon, RouterModule, NgIf, 
              LogoComponent, LoaderComponent, ModalComponent, PostComponent
           ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    authService = inject(AuthService)
    store = inject(Store<AppState>)
    private subscription!: Subscription
    dbService = inject(DatabaseService)
    broadcastService = inject(BroadcastService)
    router = inject(Router)
    postJob = signal<boolean>(false)

    modalWidth = signal<string>('w-[700px]')
    style =  signal({
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '20px'
    })
    
    
    IsInSession: boolean = false
    logOut = signal(false);
    takeOut$ = timer(1200)
    
    header: { page: string, route: string }[] = [
        { page: 'home', route: '/' },
        { page: 'about', route: '/about' },
        { page: 'Event & Seminars', route: '/events' },
        { page: 'certification/Training', route: '/training' },
        { page: 'Partners', route: '/partner' },
        { page: 'Market Place', route: '/market-place' },
        { page: 'jobs', route: '/jobs' },
        { page: 'community', route: '/community' },
        { page: 'plan', route: '/plan' },
        { page: 'blog', route: '/blog' },
        { page: 'faq', route: '/faq' },
        { page: 'contact', route: '/contact' }
    ]
    headerIcons: any = [bootstrapHouseDoorFill, bootstrapHouseDoorFill, bootstrapHouseDoorFill, bootstrapHouseDoorFill]
    socialIcons: any =  [bootstrapFacebook, bootstrapTwitter, bootstrapInstagram, bootstrapYoutube, bootstrapTiktok]
    
    authIcons: { icon: any, route: string, status: boolean }[] =  [
      { icon: bootstrapGrid1x2Fill, route: '/dashboard', status: true  },
      { icon: bootstrapPersonFill, route: '/auth/login', status: false    },
      { icon: bootstrapPersonPlusFill, route: '/auth/register', status: false   }
    ]
    iconSize: string = '14'
    authIconSize: string = '20'
    socialIconColor: string = 'white'
    authIconColor: string = 'black'
    logout: any = bootstrapPower
    hamburger: any = bootstrapList
    isHamburgOver: boolean = false
    closeMobileMenu: any = bootstrapXLg
    logoutColor: string = 'red'
    isHover: number = -1
    openMobileNav : boolean = false;

    statusMessage = 'Waiting for messages...';

    constructor()
    {
        from(this.authService.IsUserInSession())
        .pipe(
          switchMap((token) => 
          {
            if(token)
            {
              this.IsInSession = true
            } 
            return of()
          })
        )
    }
    
    ngOnInit(): void 
    {
      this.subscription = this.broadcastService.messages$.subscribe(message => 
      {
        // this.logOutUser()
        this.statusMessage = `Message received: ${message}`
      })

      this.store.select(getUserToken).subscribe((data) => 
       {
         if(data)
         {
           this.IsInSession = true
         } else {
           this.IsInSession = false
         }
       })
    }
    
    logoutBehaviour(state: string)
    {
       this.logoutColor = state === 'over' ?  'red' :  'red'
    }

   ChangeOnButtonHoverIn()
   {
      this.style.set({
        'background-color' : '#776005',
        'color': 'white',
        'padding': '20px'         
      })
    }

    ChangeOnButtonHoverOut()
    {
       this.style.set({
          'background-color' : '#be9d18',
          'color': 'black',
          'padding': '20px'        
       }) 
    }

    write()
    {

    }

    harmburger()
    {       
      this.openMobileNav = !this.openMobileNav;
    }

    overBurger()
    {
       this.isHamburgOver = !this.isHamburgOver
    }

    async logOutUser()
    {      
       this.logOut.update((currentValue: boolean) => !currentValue)
      
       await this.dbService.removeUser()
       this.takeOut$.subscribe(() =>
       {
         this.store.dispatch(PASS_THE_TOKEN())
         this.logOut.update((currentValue: boolean) => !currentValue)
         this.sendMessage()
         this.router.navigate(['auth/login'])
       })
    }

    wrteCategory()
    {

    }

    sendMessage(): void 
    {
      const message = `User action at ${new Date().toLocaleTimeString()}`;
      this.broadcastService.publish(message);
    }

    ngOnDestroy(): void 
    {
      this.subscription.unsubscribe();
      // Optionally close the channel here if no other components use it
      // this.broadcastService.close(); 
    }

    onConfirm(): void 
    {

    }   

    jobPost(): void 
    {
      this.postJob.update((toggle) => !toggle)
    }

    cancelModal()
    {
       this.postJob.set(false)
    }

    closeModal()
    {
      this.postJob.update((toggle) => !toggle)
    }

}
