import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    websiteName = '';
    VARS = varTemplate;

    constructor(private emailService: EmailService, private dbService: DbService) { }

    ngOnInit() {
        this.dbService.getWebsiteName().subscribe(
            res => {
                this.websiteName = (res.body as any).websiteName;
                this.VARS = (environment.vars as any).default.data[(environment.vars as any).default.indexes[this.websiteName]];
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
