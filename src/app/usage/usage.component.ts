import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

    websiteName = '';
    VARS = varTemplate;

    constructor(private emailService: EmailService, private dbService: DbService) { }

    ngOnInit() {
        this.dbService.getWebsiteName().subscribe(
            res => {
                this.websiteName = (res.body as any).websiteName;
                this.VARS = (environment.vars as any).default[this.websiteName];
            },
            err => {
                console.log(err)
            }
        )
    }
}
