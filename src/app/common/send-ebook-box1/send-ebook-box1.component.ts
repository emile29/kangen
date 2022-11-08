import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../email.service';
import { DbService } from '../../db.service';
import * as $ from 'jquery';
import * as varTemplate from 'src/environments/varTemplate.json';

@Component({
  selector: 'app-send-ebook-box1',
  templateUrl: './send-ebook-box1.component.html',
  styleUrls: ['./send-ebook-box1.component.scss']
})
export class SendEbookBox1Component implements OnInit {
  
  websiteName = '';
  VARS = varTemplate;

  constructor(private emailService: EmailService, private dbService: DbService) { }

  ngOnInit() {
    $("#form").submit(function(e) {
      e.preventDefault();
    });
  }

  sendEbook(firstname, lastname, email, phone) {
    let body = {
      firstname,
      lastname,
      email: email.toLowerCase(),
      phone,
      newsletter: $('.send-newsletter').is(':checked')
    };
    $('.sendEbook1-loader').css('display', 'block');
    this.emailService.sendEbook(body).subscribe(
      res => {
        if (res.status == 200) {
          console.log('Ebook sent successfully');
          $('.first-name').val('');
          $('.last-name').val('');
          $('.phone-num').val('');
          $('.email').val('');
          $('.send-newsletter').prop('checked', false);
          $('.sendEbook1-loader').css('display', 'none');
        }
      },
      err => {
        console.log(err);
        $('.first-name').val('');
        $('.last-name').val('');
        $('.phone-num').val('');
        $('.email').val('');
        $('.send-newsletter').prop('checked', false);
        alert('Something went wrong while sending the email!!');
        $('.sendEbook1-loader').css('display', 'none');
      }
    );

    if ($('.send-newsletter').is(':checked')) {
      this.dbService.addSubscriber(body).subscribe();
    }
    this.dbService.addEbookUser(body).subscribe();
  }
}
