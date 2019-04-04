import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import * as localforage from 'localforage';
import { TOKEN } from './app.constants';

export async function tokenGetter(): Promise<string> {
    return localforage.getItem(TOKEN);
}


@NgModule({
    imports: [
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:8000', 'treadwill.org', '172.20.89.77:8000'],
                blacklistedRoutes: ['localhost:8000/login', 'localhost:8000/signup']
            }
        })
    ]
})
export class AuthModule {}