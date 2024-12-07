import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/db.service';
import * as varTemplate from 'src/environments/varTemplate.json';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() backgroundImg: string;
  @Input() bannerTitle: string;
  websiteName = '';
  VARS = varTemplate;
  isPersonalWebsite = false;
  teamName = "";

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dbService.getWebsiteName().subscribe(
      (res) => {
        this.websiteName = (res.body as any).websiteName;
        this.teamName = this.websiteName.split('kangen')[1].charAt(0).toUpperCase() + this.websiteName.split('kangen')[1].slice(1);
        if (this.websiteName.includes('southafrica')) {
          this.teamName = "South Africa";
        }
        this.VARS = (environment.vars as any).default[this.websiteName];
        if (this.websiteName.includes('kenya')) {
          this.isPersonalWebsite = true;
        }
      },
      err => {
        console.log(err)
      }
    )
    
    $('.banner').css({
      'background': `url(${this.backgroundImg}) no-repeat`,
      'background-size': 'cover'
    });
  }
}
