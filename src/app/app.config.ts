import { ApplicationConfig, provideZoneChangeDetection, isDevMode, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideQuillConfig } from 'ngx-quill';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppReducer } from './state/app.state';
import { AuthEffect } from './state/effects/auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { CustomSerializer } from './router/custom-serializer';
import { UserEffect } from './state/effects/user.effects';
import { requestInterceptor } from './core/interceptors/request.interceptor';
// @ts-ignore
// import { provideAngularPaystack } from 'angular-paystack';
import { environment } from '../environments/environment.development';
import { JobEffect } from './state/effects/job.effects';
import { GeolocationService } from './util/location/geolocation.service';
import { LocationService } from './util/location/location.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'
import { CategoryEffect } from './state/effects/management/category.effects';
import { RemoveEffect } from './state/effects/remove.effects';
import { DivisionEffect } from './state/effects/management/division.effects';
import { DepartmentEffect } from './state/effects/management/department.effects';
import { RoleEffect } from './state/effects/management/role.effects';
import { RexourceEffect } from './state/effects/management/rexource.effects';


export function initializeLocation(locationService: LocationService) 
{
  return () => locationService.loadLocation();
}





export const appConfig: ApplicationConfig = {
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeLocation,
    //   deps: [LocationService],
    //   multi: true
    // },
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideStore(AppReducer),
    provideEffects(
        [
          AuthEffect, UserEffect, JobEffect, 
          CategoryEffect, RemoveEffect, DivisionEffect, DepartmentEffect, RoleEffect, RexourceEffect
        ]
    ),
    provideRouterStore({
      serializer: CustomSerializer
    }),
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    provideQuillConfig({}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService,
    // provideAngularPaystack(`${environment.PUBLIC_KEY}`)
  ]
};
