import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    currentType = "";
    machineTypes = ["anespa", "r", "jriv", "super501", "sd501", "sd501-plat", "k8", "emguarde", 
                    "other", "freetrial", "becoming-a-distributor", "freecall", "ordering"];
    machineFullNames = {
        "anespa": "ANESPA DX",
        "jriv": "Leveluk JRIV",
        "super501": "Leveluk SUPER 501",
        "sd501": "Leveluk SD501",
        "sd501-plat": "Leveluk SD501 PLATINUM 5-LANGUAGE",
        "k8": "Leveluk K8",
        "emguarde": "emGuarde",
        "other": "Other",
        "freetrial": "FREE Kangen Water Trial",
        "becoming-a-distributor": "Becoming a Distributor",
        "freecall": "FREE 30 Min Call/Meeting",
        "ordering": "Ordering"
    };
    websiteName = '';
    VARS = varTemplate;

    constructor(private emailService: EmailService, private dbService: DbService) { }

    ngOnInit() {
        this.dbService.getWebsiteName().subscribe(
            (res) => {
                this.websiteName = (res.body as any).websiteName;
                this.VARS = (environment.vars as any).default[this.websiteName];
            },
            err => {
                console.log(err)
            }
        )

        for (let i = 0; i < this.machineTypes.length; i++) {
            $(`.${this.machineTypes[i]}`).on('click', () => {
                this.currentType = this.machineTypes[i];
                for (let j = 0; j < this.machineTypes.length; j++) {
                    if (this.machineTypes[j] != `${this.machineTypes[i]}` && ($(`.${this.machineTypes[j]}`).is(':checked'))) {
                        $(`.${this.machineTypes[j]}`).prop('checked', false);
                    }
                }
            });
        }
    }

    sendEmail(firstname, lastname, email, phone, city, country, message) {
        if (this.currentType != "") {
            let currentTypeFull = this.machineFullNames[this.currentType];
            $('.loader-1').css('display', 'block');
            this.emailService.sendEmail(currentTypeFull, firstname, lastname, city, 
                                        country, phone, email.toLowerCase(), message).subscribe(
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
                        $(".send-status").css({ display: "inline-block" });
                        $('.loader-1').css('display', 'none');
                        setTimeout(() => {
                            $(".send-status").css({ display: "none" });
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
                    alert('Something went wrong while sending the email!!');
                    $('.loader-1').css('display', 'none');
                }
            );
        } else {
            alert('Subject of interest missing!! Please choose one.');
        }
    }
}
