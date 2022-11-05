import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as VARS from './../../vars.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    VARS: any = (VARS as any).default;

	constructor() {}

	ngOnInit() {
		// $(window).scroll(() => {
		// 	const scroll = $(window).scrollTop();
		// 	if (scroll > 0) {
		// 		$('.header-container').addClass('active');
		// 	} else {
		// 		$('.header-container').removeClass('active');
		// 	}
		// });
	}
}
