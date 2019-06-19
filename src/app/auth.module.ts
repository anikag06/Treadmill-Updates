import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { TOKEN } from './app.constants';

export function tokenGetter() {
    return localStorage.getItem(TOKEN);
}


@NgModule({
    imports: [
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:8000', '127.0.0.1:8000', '172.26.90.55:8000', '172.26.90.55:9000'],
                blacklistedRoutes: ['localhost:8000/login', 'localhost:8000/signup', 'localhost:8000/landing']
            }
        })
    ]
})
export class AuthModule {}
