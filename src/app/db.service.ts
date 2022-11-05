import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {
    uri = "";

    constructor(private http: HttpClient) {
        if (environment.production) {
			this.uri = '/api';
		} else {
			this.uri = 'http://localhost:8080/api';
		}
    }

    addSubscriber(body) {
        return this.http.post(`${this.uri}/newsletterSubscribers/add`, body, {observe: 'response'});
    }
}
