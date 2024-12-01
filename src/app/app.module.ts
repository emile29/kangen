import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { VideosComponent } from './videos/videos.component';
import { UsageComponent } from './usage/usage.component';
import { ContactComponent } from './contact/contact.component';
import { SendEbookBox1Component } from './common/send-ebook-box1/send-ebook-box1.component';
import { SendEbookBox2Component } from './common/send-ebook-box2/send-ebook-box2.component';
import { BannerComponent } from './common/banner/banner.component';
import { PopupComponent } from './popup/popup.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductsComponent,
    TeamComponent,
    VideosComponent,
    UsageComponent,
    ContactComponent,
    SendEbookBox1Component,
    SendEbookBox2Component,
    BannerComponent,
    PopupComponent,
    NavbarComponent,
    TestimonialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    HttpClientModule
    // BrowserAnimationsModule,
    // MatTooltipModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
