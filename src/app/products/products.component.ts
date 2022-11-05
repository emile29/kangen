import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    websiteName = '';
    VARS = {};
    env_vars: any = environment.vars as any;

    constructor(private emailService: EmailService, private dbService: DbService) { }

    ngOnInit() {
        this.dbService.getWebsiteName().subscribe(
            res => {
                let body: any = res.body as any;
                this.websiteName = body.websiteName;
                this.VARS = this.env_vars.default.data[this.env_vars.default.indexes[this.websiteName]];
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

}
