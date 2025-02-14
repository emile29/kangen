import { Component } from '@angular/core';
import { DbService } from './db.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	websiteName = '';
	VARS = varTemplate;
	isPersonalWebsite = false;
	teamName = "";

	constructor(private dbService: DbService, private titleService: Title) {}

	ngOnInit() {
		// $(window).scroll(() => {
		// 	const scroll = $(window).scrollTop();
		// 	if (scroll > 0) {
		// 		$('.header-container').addClass('active');
		// 	} else {
		// 		$('.header-container').removeClass('active');
		// 	}
		// });
		this.dbService.getWebsiteName().subscribe(
            res => {
                this.websiteName = (res.body as any).websiteName;
				this.teamName = this.websiteName.split('kangen')[1].charAt(0).toUpperCase() + this.websiteName.split('kangen')[1].slice(1);
                if (this.websiteName.includes('southafrica')) {
                    this.teamName = "South Africa";
                }
				// if (this.websiteName.includes('kenya')) {
                //     this.isPersonalWebsite = true;
                // }
                this.VARS = (environment.vars as any).default[this.websiteName];

				// set page title dynamically
				let pageTitle = this.VARS.pageTitle;
				this.titleService.setTitle(pageTitle);
            },
            err => {
                console.log(err)
            }
        )
	}
}
