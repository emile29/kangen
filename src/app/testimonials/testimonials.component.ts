import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    websiteName = '';
    constructor(private dbService: DbService, private titleService: Title) { }

    ngOnInit() { 
      this.dbService.getWebsiteName().subscribe(
        res => {
          this.websiteName = (res.body as any).websiteName;
          if (this.websiteName == "kangennigeria") {
            $(".main-container").html('<div style="padding: 50px; text-align: center">coming soon</div>');
          }
        },
        err => {
          console.log(err)
        }
      );
    }
}
