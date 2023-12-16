import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    websiteName = '';
    constructor(private dbService: DbService) { }

    ngOnInit() { 
      this.dbService.getWebsiteName().subscribe(
        res => {
          this.websiteName = (res.body as any).websiteName;
          if (this.websiteName == "kangenkenya") {
            $(".main-container").html('<div style="padding: 50px; text-align: center">coming soon</div>');
          }
        },
        err => {
          console.log(err)
        }
      );
    }
}
