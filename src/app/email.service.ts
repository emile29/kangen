import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
    uri = "";

    constructor(private http: HttpClient) {
        if (environment.production) {
			this.uri = '/api';
		} else {
			this.uri = 'http://localhost:8080/api';
		}
    }

    sendEmail(machineType, firstname, lastname, city, country, phone, email, message) {
        const body = {
            machineType,
            firstname,
            lastname,
            city,
            country,
            phone,
            email,
            message
        };
        return this.http.post(`${this.uri}/sendmail`, body, {observe: 'response'});
    }

    sendEbook(body) {
        return this.http.post(`${this.uri}/sendEbook`, body, {observe: 'response'});
    }
}
