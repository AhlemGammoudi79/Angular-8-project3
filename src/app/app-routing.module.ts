import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { AddGiftComponent } from './components/add-gift/add-gift.component';
import { BasketComponent } from './components/basket/basket.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DisplayGiftComponent } from './components/display-gift/display-gift.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { TabAdminComponent } from './components/tab-admin/tab-admin.component';
import { TabClientComponent } from './components/tab-client/tab-client.component';
import { TabFournisseurComponent } from './components/tab-fournisseur/tab-fournisseur.component';
import { TabGiftComponent } from './components/tab-gift/tab-gift.component';
import { ProfilFornisseurComponent } from './components/profil-fornisseur/profil-fornisseur.component';
import { TabDashboardComponent } from './components/tab-dashboard/tab-dashboard.component';
import { ContactService } from './services/contact.service';
import { ContactComponent } from './components/contact/contact.component';
import { TabContactComponent } from './components/tab-contact/tab-contact.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { TabOrdersComponent } from './components/tab-orders/tab-orders.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { LikeComponent } from './components/like/like.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'addFournisseur',component:AddFournisseurComponent},
  {path:'addAdmin',component:AddAdminComponent},
  {path:'profilFournisseur/addGift',component:AddGiftComponent},
  {path:'dashboardAdmin',component:DashboardAdminComponent},
  {path:'tabAdmin',component:TabAdminComponent},
  {path:'tabFournisseur',component:TabFournisseurComponent},
  {path:'tabDashboard',component:TabDashboardComponent},
  {path:'tabClient',component:TabClientComponent},
  {path:'tabGifts',component:TabGiftComponent},
  {path:'editUser/:id',component:AddAdminComponent},
  {path:'editGift/:id',component:AddGiftComponent},
  {path:'displayGift/:id',component:DisplayGiftComponent},
  {path:'basket',component:BasketComponent},
  {path:'profilFournisseur',component:ProfilFornisseurComponent},
  {path:'contact',component:ContactComponent},
  {path:'tabContact',component:TabContactComponent},
  {path:'about',component:AboutComponent},
  {path:'search',component:SearchComponent},
  {path:'basket/search',component:SearchComponent},
  {path:'tabOrders',component:TabOrdersComponent},
  {path:'displayUser/:id',component:DisplayUserComponent},
  {path:'like',component:LikeComponent},
 




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
