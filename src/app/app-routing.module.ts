import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UsageComponent } from './usage/usage.component';
import { ProductsComponent } from './products/products.component';
import { VideosComponent } from './videos/videos.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'usage', component: UsageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'testimonials', component: TestimonialsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomepageComponent,
  UsageComponent,
  ProductsComponent,
  ContactComponent,
  VideosComponent,
  TestimonialsComponent
];
