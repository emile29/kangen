import { Component } from '@angular/core';
import * as $ from 'jquery';
import { DbService } from './db.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	websiteName = '';
	VARS = {};

	constructor(private dbService: DbService) {}

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
            },
            err => {
                console.log(err)
            }
        )
	}
}
