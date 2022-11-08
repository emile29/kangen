import { Component } from '@angular/core';
import * as $ from 'jquery';
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
                this.VARS = (environment.vars as any).default.data[(environment.vars as any).default.indexes[this.websiteName]];

				// set page title dynamically
				let title = 'Kangen ' + this.capitalizeFirstLetter(this.websiteName.split('kangen')[1]);
				this.titleService.setTitle(title);
            },
            err => {
                console.log(err)
            }
        )
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
