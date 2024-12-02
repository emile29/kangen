import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    websiteName = '';
    VARS = varTemplate;
    locPhone = [];
    isPersonalWebsite = false;
    teamName = "";

    constructor(private emailService: EmailService, private dbService: DbService) { }

    ngOnInit() {
        this.dbService.getWebsiteName().subscribe(
            res => {
                this.websiteName = (res.body as any).websiteName;
                this.teamName = this.websiteName.split('kangen')[1].charAt(0).toUpperCase() + this.websiteName.split('kangen')[1].slice(1);
                if (this.websiteName.includes('southafrica')) {
                    this.teamName = "South Africa";
                }
                if (this.websiteName.includes('professional') || this.websiteName.includes('kenya')) {
                    this.isPersonalWebsite = true;
                }
                this.VARS = (environment.vars as any).default[this.websiteName];
                let loc = this.VARS.location.split("|");
                let phone = this.VARS.phone.split("|");
                for (let i=0; i<loc.length; i++) {
                    this.locPhone.push({loc: loc[i].trim(), phone: phone[i].trim()});
                }
            },
            err => {
                console.log(err)
            }
        )
    }

    sendEbook(firstname, lastname, email, phone) {
        if (firstname != '' && lastname != '' && email != '' && phone != '') {
            let body = {
                firstname,
                lastname,
                email: email.toLowerCase(),
                phone
            };
            $('.loader').css('display', 'block');
            this.emailService.sendEbook(body).subscribe(
                res => {
                    if (res.status == 200) {
                        console.log('Ebook sent successfully!');
                        $('.first-name').val('');
                        $('.last-name').val('');
                        $('.phone-num').val('');
                        $('.email').val('');
                        $('.send-newsletter').prop('checked', false);
                        $('.loader').css('display', 'none');
                    }
                },
                err => {
                    console.log(err);
                    $('.first-name').val('');
                    $('.last-name').val('');
                    $('.phone-num').val('');
                    $('.email').val('');
                    $('.send-newsletter').prop('checked', false);
                    alert('Something went wrong while sending the email!!');
                    $('.loader').css('display', 'none');
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
