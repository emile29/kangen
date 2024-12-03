import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    websiteName = '';
    VARS = varTemplate;
    teamMembers = [];
    numOfRows = 0;
    teamName = "";
    isPersonalWebsite = false;

    constructor(private dbService: DbService) { }

    ngOnInit() { 
      this.dbService.getWebsiteName().subscribe(
        res => {
          this.websiteName = (res.body as any).websiteName;
          this.teamName = this.websiteName.split('kangen')[1].charAt(0).toUpperCase() + this.websiteName.split('kangen')[1].slice(1);
          if (this.websiteName.includes('southafrica')) {
            this.teamName = "South Africa";
          }
          if (this.websiteName.includes('professional')) {
            this.isPersonalWebsite = true;
          }
          this.VARS = (environment.vars as any).default[this.websiteName];
          this.teamMembers = this.VARS.teamMembers;
          let screenWidth = window.innerWidth;
          this.numOfRows = Math.ceil(this.teamMembers.length / 3);
          if (screenWidth <= 425) {
            this.numOfRows = Math.ceil(this.teamMembers.length / 2);
          }
          // if (this.websiteName == "kangenkenya") {
          //   $(".main-container").html('<div style="padding: 50px; text-align: center">coming soon</div>');
          // }
        },
        err => {
          console.log(err)
        }
      );
    }
}
