import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    machineTypes = ["anespa", "r", "jriv", "super501", "sd501", "sd501-plat", "k8"];
    currentType = "";
    machineFullNames = {
        "anespa": "ANESPA DX",
        "r": "Leveluk R",
        "jriv": "Leveluk JRIV",
        "super501": "Leveluk SUPER 501",
        "sd501": "Leveluk SD501",
        "sd501-plat": "Leveluk SD501 PLATINUM 5-LANGUAGE",
        "k8": "Leveluk K8"
    };
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

    for (let i=0; i<this.machineTypes.length; i++) {
        $(`.${this.machineTypes[i]}`).on('click', () => {
            this.currentType = this.machineTypes[i];
            for (let j=0; j<this.machineTypes.length; j++) {
                if (this.machineTypes[j] != `${this.machineTypes[i]}` && ($(`.${this.machineTypes[j]}`).is(':checked'))) {
                    $(`.${this.machineTypes[j]}`).prop('checked', false);
                }
            }
        });
    }
  }

    sendEmail(firstname, lastname, email, phone, city, country, message) {
        if (firstname != "" && lastname != "" && email != "" && this.currentType != "" &&
            phone != "" && city != "" && country != "") {
            if (phone.length < 7) {
                alert('Enter a valid phone number!!');
            } else {
                let currentTypeFull = this.machineFullNames[this.currentType];
                this.emailService.sendEmail(currentTypeFull, firstname, lastname,
                                                    city, country, phone, email.toLowerCase(), message).subscribe(
                    res => {
                        if (res.status == 200) {
                            console.log('Email sent successfully');
                            $(`.${this.currentType}`).prop('checked', false);
                            $(".first-name-1").val("");
                            $(".last-name-1").val("");
                            $(".email-1").val("");
                            $(".phone-num-1").val("");
                            $(".city-1").val("");
                            $(".country-1").val("");
                            $(".msg-box").val("");
                            $(".send-status").css({display: "inline-block"});
                            setTimeout(() => {
                                $(".send-status").css({display: "none"});
                            }, 2000);
                        }
                    },
                    err => {
                        console.log(err);
                        $(`.${this.currentType}`).prop('checked', false);
                        $(".first-name-1").val("");
                        $(".last-name-1").val("");
                        $(".email-1").val("");
                        $(".phone-num-1").val("");
                        $(".city-1").val("");
                        $(".country-1").val("");
                        $(".msg-box").val("");
                        alert('Invalid email!! Please try again.');
                    }
                );
            }
        } else {
            alert('Some fields are missing!!');
        }
    }

    sendEbook(firstname, lastname, email, phone) {
        if (firstname != '' && lastname != '' && email != '' && phone != '') {
            let body = {
                firstname,
                lastname,
                email: email.toLowerCase(),
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
