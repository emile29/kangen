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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductsComponent,
    VideosComponent,
    UsageComponent,
    ContactComponent
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
