import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(AppReducer),
    provideEffects([AuthEffect, UserEffect]),
    provideRouterStore({
      serializer: CustomSerializer
    }),
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    provideQuillConfig({}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService,
  ]
};
