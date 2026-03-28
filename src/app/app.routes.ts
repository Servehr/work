import { Routes } from '@angular/router';
import { LandingComponent } from './layout/landing/landing.component';
import { HomeComponent } from './modules/anonymous/home/home.component';
import { AboutComponent } from './modules/anonymous/about/about.component';
import { EventsComponent } from './modules/anonymous/events/events.component';
import { TrainingComponent } from './modules/anonymous/training/training.component';
import { JobsComponent } from './modules/anonymous/jobs/jobs.component';
import { CommunityComponent } from './modules/anonymous/community/community.component';
import { BlogComponent } from './modules/anonymous/blog/blog.component';
import { FaqComponent } from './modules/anonymous/faq/faq.component';
import { ContactComponent } from './modules/anonymous/contact/contact.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetComponent } from './modules/auth/reset/reset.component';
import { ForgotComponent } from './modules/auth/forgot/forgot.component';
import { ResendComponent } from './modules/auth/resend/resend.component';
import { AdminComponent } from './layout/admin/admin.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { ManagementComponent } from './modules/admin/management/management.component';
import { AdministrationComponent } from './modules/admin/administration/administration.component';
import { VendorsComponent } from './modules/admin/vendors/vendors.component';
import { TechniciansComponent } from './modules/admin/technicians/technicians.component';
import { CmsComponent } from './modules/admin/cms/cms.component';
import { PlansComponent } from './modules/admin/plans/plans.component';
import { SettingsComponent } from './modules/admin/settings/settings.component';
import { PartnersComponent } from './modules/admin/partners/partners.component';
import { PartnerComponent } from './modules/anonymous/partner/partner.component';
import { ProfileComponent } from './modules/admin/profile/profile/profile.component';
import { adminGuard } from './core/guard/admin.guard';
import { unauthenticateGuard } from './core/guard/unauthenticate/unauthenticate.guard';
import { NewPasswordComponent } from './modules/auth/new-password/new-password.component';
import { UserComponent } from './layout/user/user.component';
import { RequestComponent } from './modules/admin/request/request.component';
import { NotificationComponent } from './modules/admin/notification/notification.component';
import { InfoComponent } from './modules/user/info/info.component';
import { UploadComponent } from './modules/user/upload/upload.component';
import { StaffComponent } from './modules/admin/administration/user/staff/staff.component';

export const routes: Routes = [
   { 
      path: '', 
      component: LandingComponent, 
      children: 
      [
        { path: '', component: HomeComponent  },
        { path: 'home', component: HomeComponent  },
        { path: 'about', component: AboutComponent  },
        { path: 'events', component: EventsComponent  },
        { path: 'training', component: TrainingComponent  },
        { path: 'jobs', component: JobsComponent  },
        { path: 'community', component: CommunityComponent  },
        { path: 'blog', component: BlogComponent  },
        { path: 'partner', component: PartnerComponent   },
        { path: 'faq', component: FaqComponent  },
        { path: 'contact', component: ContactComponent  }
      ]  
   },
   { 
      path: 'auth', 
      canActivateChild: [unauthenticateGuard],
      component: LandingComponent, 
      children: 
      [
        { path: 'login', component: LoginComponent  },
        { path: 'register', component: RegisterComponent  },
        { path: 'forgot', component: ForgotComponent  },
        { path: 'new-password', component: NewPasswordComponent  },
        { path: 'resend', component: ResendComponent  }
      ]  
   },
   { 
      path: '', 
      canActivateChild: [adminGuard],
      component: AdminComponent, 
      children: 
      [
        { path: 'dashboard', component: DashboardComponent  },
        { path: 'profile', component: ProfileComponent  },
        { path: 'management', component: ManagementComponent  },
        { path: 'administration', component: StaffComponent  },
        { path: 'technicians', component: TechniciansComponent  },
        { path: 'vendors', component: VendorsComponent  },
        { path: 'partners', component: PartnersComponent  },
        { path: 'cms', component: CmsComponent  },
        { path: 'plans', component: PlansComponent  },
        { path: 'settings', component: SettingsComponent  },
        { path: 'request', component: RequestComponent  },
        { path: 'notifications', component: NotificationComponent  },
      ]  
   },
   { 
      path: 'user',
      component: UserComponent, 
      children: 
      [
         { path: 'info', component: InfoComponent  },
         { path: 'upload', component: UploadComponent  }
      ]  
   }
];
