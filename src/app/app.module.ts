import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ProfilFornisseurComponent } from './components/profil-fornisseur/profil-fornisseur.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { VideoComponent } from './components/video/video.component';
import { HomeComponent } from './components/home/home.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddGiftComponent } from './components/add-gift/add-gift.component';
import { TabFournisseurComponent } from './components/tab-fournisseur/tab-fournisseur.component';
import { TabAdminComponent } from './components/tab-admin/tab-admin.component';
import { TabClientComponent } from './components/tab-client/tab-client.component';
import { TabGiftComponent } from './components/tab-gift/tab-gift.component';
import { GiftsComponent } from './components/gifts/gifts.component';
import { GiftDiscountsComponent } from './components/gift-discounts/gift-discounts.component';
import { DisplayGiftComponent } from './components/display-gift/display-gift.component';
import { BasketComponent } from './components/basket/basket.component';
import { TabDashboardComponent } from './components/tab-dashboard/tab-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { TabContactComponent } from './components/tab-contact/tab-contact.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { TabOrdersComponent } from './components/tab-orders/tab-orders.component';
import { LikeComponent } from './components/like/like.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardAdminComponent,
    ProfilFornisseurComponent,
    AddAdminComponent,
    AddFournisseurComponent,
    FooterComponent,
    HeaderComponent,
    VideoComponent,
    HomeComponent,
    DisplayUserComponent,
    CategoriesComponent,
    AddGiftComponent,
    TabFournisseurComponent,
    TabAdminComponent,
    TabClientComponent,
    TabGiftComponent,
    GiftsComponent,
    GiftDiscountsComponent,
    DisplayGiftComponent,
    BasketComponent,
    TabDashboardComponent,
    ContactComponent,
    TabContactComponent,
    AboutComponent,
    SearchComponent,
    TabOrdersComponent,
    LikeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
   
    HttpClientModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
