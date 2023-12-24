import { ApplicationConfig, CSP_NONCE} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { InterceptorAPI } from './Interceptor-API';
import { makeid } from './generatenonce';

import { routes } from './app.routes';
const nonce = (
  document.querySelector('meta[name="CSP_NONCE"]') as HTMLMetaElement
)?.content;

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([InterceptorAPI])),
    {
      provide: CSP_NONCE,
      useValue: makeid(16),
    },
  ]
};
