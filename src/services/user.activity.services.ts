import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from './config';
import 'rxjs/Rx';

@Injectable()
export class UserActivityService {

    constructor(private http: Http) {

    }
    getUserActivities(userToken:string, user_id:string){
        let options = new RequestOptions({
            headers: new Headers({
                Authorization: 'bearer ' + userToken
            })
        });
        return this.http.get(SERVER_URL + '/users/'+user_id+'/activities', options).map(res => res.json());
    }

}


// WEBPACK FOOTER //
// ./src/services/auth.services.ts