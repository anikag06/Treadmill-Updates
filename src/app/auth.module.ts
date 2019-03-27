import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import * as localforage from 'localforage';
import { TOKEN } from './app.constants';

export function tokenGetter(): Promise<string> {
    return localforage.getItem(TOKEN);
}


@NgModule({
    imports: [
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:8000', 'treadwill.org'],
                blacklistedRoutes: ['localhost:8000/login', 'localhost:8000/signup']
            }
        })
    ]
})
export class AuthModule {}