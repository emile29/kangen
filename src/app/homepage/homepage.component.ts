import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import * as VARS from './../../../vars.json';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    VARS: any = (VARS as any).default;

    constructor(private emailService: EmailService, private dbService: DbService) { }

    ngOnInit() {
    }

    sendEbook(firstname, lastname, email, phone) {
        if (firstname != '' && lastname != '' && email != '' && phone != '') {
            let body = {
                firstname,
                lastname,
                email,
                phone
            };
            this.emailService.sendEbook(body).subscribe(
                res => {
                    if (res.status == 200) {
                        console.log('Ebook sent successfully!');
                        $('.first-name').val('');
                        $('.last-name').val('');
                        $('.phone-num').val('');
                        $('.email').val('');
                        $('.send-newsletter').prop('checked', false);
                    }
                },
                err => {
                    console.log(err);
                    $('.first-name').val('');
                    $('.last-name').val('');
                    $('.phone-num').val('');
                    $('.email').val('');
                    $('.send-newsletter').prop('checked', false);
                    alert('Invalid email!! Please try again.');
                }
            );

            if ($('.send-newsletter').is(':checked')) {
                this.addSubscriber(body);
            }
            this.addEbookUser(body);
        } else {
            alert('Some fields are missing!!');
        }
    }

    addSubscriber(body) {
        this.dbService.addSubscriber(body).subscribe(
            res => {
                if (res.status == 200) {
                    console.log('Subscriber added successfully!');
                }
            },
            err => {
                console.log('Email already registered in the system');
            }
        );
    }

    addEbookUser(body) {
        this.dbService.addEbookUser(body).subscribe(
            res => {
                if (res.status == 200) {
                    console.log('ebookUser added successfully!');
                }
            },
            err => {
                console.log('Email already registered in the system');
            }
        );
    }
}
