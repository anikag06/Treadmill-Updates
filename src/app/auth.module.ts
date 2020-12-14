import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { TOKEN } from './app.constants';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return (
    window.localStorage.getItem(TOKEN) || window.sessionStorage.getItem(TOKEN)
  );
}

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'www.botv2.treadwill.org:8002',
          environment.API_ENDPOINT,
        ],
        blacklistedRoutes: [],
      },
    }),
  ],
})
export class AuthModule {}
