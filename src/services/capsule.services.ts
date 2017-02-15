import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from './config';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Injectable()
export class CapsuleServices {


    constructor(private http: Http, private storage: Storage) {

    }

    getSchools() {
        return this.http.get(SERVER_URL + '/schools?name=all')
            .map(res => res.json())
    }

    getCapsules(userToken: string) {

        let requestHeaders = new Headers();
        requestHeaders.append('Authorization', 'bearer ' + userToken);

        let requestOptions = new RequestOptions({
            headers: requestHeaders,
        });

        return this.http.get(SERVER_URL + '/capsules', requestOptions).map(res => res.json());
    }

    getCapsuleById(userToken: string, capsuleId: number) {
        let requestHeaders = new Headers();
        requestHeaders.append('Authorization', 'bearer ' + userToken);

        return this.http.get(SERVER_URL + "/capsules/${capsuleId}").map(res => res.json());
    }

    addCapsules(userToken: string, params) {

        let requestHeaders = new Headers();
        requestHeaders.append('Authorization', 'bearer ' + userToken);
        requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        let requestBody = new URLSearchParams();
        requestBody.set('user_id', params.user_id);
        requestBody.set('school_id', params.school_id);
        requestBody.set('title', params.title);
        requestBody.set('content', params.content);
        requestBody.set('latitude', params.latitude);
        requestBody.set('longitude', params.longitude);
        requestBody.set('friends', params.friends);

        let requestOptions = new RequestOptions({
            headers: requestHeaders,
        });

        return this.http.post(SERVER_URL + '/capsules', requestBody, requestOptions)
            .map(res => res.json())
    }

    unlockRequest(userToken: string, params){
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type','application/x-www-form-urlencoded')
        requestHeaders.append('Authorization','bearer ' + userToken)

        let requestBody = new URLSearchParams();
        requestBody.set('latitude', params.latitude);
        requestBody.set('longitude', params.longitude);

         let requestOptions = new RequestOptions({
            body : requestBody,
            headers: requestHeaders
            });

        return this.http.post(SERVER_URL + '/capsules/'+params.capsule_id + '/open', requestBody, requestOptions).map(res => res.json());

    }

    getCapsuleInfo(userToken: string, capsule_id){
         let requestHeaders = new Headers();
         requestHeaders.append('Content-Type','application/x-www-form-urlencoded')
         requestHeaders.append('Authorization','bearer ' + userToken)

        let requestOptions = new RequestOptions({
            headers: requestHeaders
            });
          return this.http.get(SERVER_URL + '/capsules/'+ capsule_id, requestOptions).map(res => res.json());
    }

}


// WEBPACK FOOTER //
// ./src/services/capsule.services.ts