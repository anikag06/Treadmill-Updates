import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { TOKEN } from './app.constants';

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
          'localhost:8000',
          'localhost:9000',
          '127.0.0.1:8000',
          'www.api2.treadwill.org',
          'botv2.treadwill.org',
          '172.26.90.49:8000',
          '172.26.90.49:9000',
          '172.26.90.50:8000',
          '172.26.90.50:9000',
          '172.17.164.227:8080',
        ],
        blacklistedRoutes: [],
      },
    }),
  ],
})
export class AuthModule {}
