import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from './config';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    constructor(private http: Http) {

    }

    signIn(userEmail: string, userSecret: string) {

        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        });

        let body = new URLSearchParams();
        body.set('email', userEmail);
        body.set('password', userSecret);

        return this.http.post(SERVER_URL + '/auth', body, options).map(res => res.json())
    }

    signUp(userEmail: string, userSecret: string, userName: string) {
        let requestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        });
        let requestBody = new URLSearchParams();
        requestBody.set('name', userName);
        requestBody.set('email', userEmail);
        requestBody.set('password', userSecret);
        return this.http.post(SERVER_URL + '/users', requestBody, requestOptions).map(res => res.json());
    }

    signOut(userToken: string) {
        let requestHeaders = new Headers({
            Authorization: userToken
        })
        let requestOptions = new RequestOptions({ headers: requestHeaders })
        return this.http.get(SERVER_URL + '/logout', requestOptions).map(res => res.json());
    }

    refreshToken(userToken: string) {
        let requestHeaders = new Headers({
        })
        let requestBody = {
            type: 'extension',
            token: userToken
        };
        let requestOptions = new RequestOptions({ headers: requestHeaders, body: requestBody })

        return this.http.get(SERVER_URL + '/token', requestOptions).map(res => res.json());
    }

    getUserInfo(userToken: string) {
        let requestHeaders = new Headers({
            Authorization: userToken
        })
        let requestOptions = new RequestOptions({ headers: requestHeaders })
        return this.http.get(SERVER_URL + '/users/me', requestOptions).map(res => res.json());
    }

    getAllUser(userToken : string){
        let requestHeaders = new Headers({
            Authorization : userToken
        });
        let requestOptions = new RequestOptions({ headers: requestHeaders })
        return this.http.get(SERVER_URL + '/users', requestOptions).map(res => res.json());
    }
}


// WEBPACK FOOTER //
// ./src/services/auth.services.ts