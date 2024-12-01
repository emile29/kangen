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
    constructor(private dbService: DbService) { }

    ngOnInit() { 
      this.dbService.getWebsiteName().subscribe(
        res => {
          this.websiteName = (res.body as any).websiteName;
          this.VARS = (environment.vars as any).default[this.websiteName];
          this.teamMembers = this.VARS.teamMembers;
          this.numOfRows = Math.ceil(this.teamMembers.length / 3);
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
