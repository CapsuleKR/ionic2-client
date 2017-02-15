import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from './config';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Injectable()
export class TimelineService {
    constructor(private http: Http, private storage: Storage) {

    }

    getTimeline(userToken: string) {
        let options = new RequestOptions({
            headers: new Headers({
                Authorization: 'bearer ' + userToken
            })
        });
        return this.http.get(SERVER_URL + '/timeline', options).map(res => res.json())
    }

    postTimeline(userToken : string, params){
        let requestBody = new URLSearchParams();
        requestBody.set('title', params.title);
        requestBody.set('content', params.content);
        requestBody.set('latitude', params.latitude);
        requestBody.set('longitude', params.longitude);

        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type','application/x-www-form-urlencoded')
        requestHeaders.append('Authorization','bearer ' + userToken)

        let requestOptions = new RequestOptions({
            body : requestBody,
            headers: requestHeaders
        });

        return this.http.post(SERVER_URL + '/timeline', requestBody, requestOptions).map(res => res.json());
    }
}


// WEBPACK FOOTER //
// ./src/services/timeline.services.ts