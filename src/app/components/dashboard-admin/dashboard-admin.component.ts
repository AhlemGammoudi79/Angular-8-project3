import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { GiftService } from 'src/app/services/gift.service';
import { UserService } from 'src/app/services/user.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { AddFournisseurComponent } from '../add-fournisseur/add-fournisseur.component';
import { SignupComponent } from '../signup/signup.component';
import { TabAdminComponent } from '../tab-admin/tab-admin.component';
import { TabClientComponent } from '../tab-client/tab-client.component';
import { TabContactComponent } from '../tab-contact/tab-contact.component';
import { TabDashboardComponent } from '../tab-dashboard/tab-dashboard.component';
import { TabFournisseurComponent } from '../tab-fournisseur/tab-fournisseur.component';
import { TabGiftComponent } from '../tab-gift/tab-gift.component';
import { TabOrdersComponent } from '../tab-orders/tab-orders.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  component:any=TabDashboardComponent;
  users:any;
  gifts:any;
  adminsClients:any=[];
  fournisseur:any=[];
  adminsGift:any=[];
  user:any={};
  contacts:any;
  statut:any;
  isDesplay:any;
  SearchForm:FormGroup;

  constructor(private router:Router,private userService: UserService
    ,private giftService:GiftService,private formBuilder:FormBuilder,private contactService:ContactService) { }
  
  ngOnInit() {
    this.SearchForm=this.formBuilder.group({
      searchValue:[''],
  
    })

    this.userService.getUsers().subscribe((data)=>{
      console.log(data.users);
      this.users = data.users;
      for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].role =="admin" || this.users[i].role =="client")
      {
      this.adminsClients.push(this.users[i]);

    }
       
      else
      {
        this.fournisseur.push(this.users[i]);
  

      }
      
      }

  })



// traitement get all gifts
this.giftService.getGifts().subscribe((data)=>{
  console.log(data.gifts);
  this.gifts = data.gifts;


})





  }
  

  displayUser(id:any){
 this.router.navigate([`displayUser/${id}`]);
  }


  displayPlat(id:any){
    this.router.navigate([`displayPlat/${id}`]);
     }


  editUser(id:any,role:any){
    if (role=="admin" || role=="client") {
      this.router.navigate([`editUser/${id}`]);
    } else {
      this.router.navigate([`editChef/${id}`]);

    }
    }



  getColor(role) {
   switch (role) {
     case 'admin':
       return 'green';
       break;
   
       case 'client':
        return 'blue';
        break;

        case 'chef':
          return 'red';
          break;
   }
    
  }


  assignComponent(component){
    if (component === 'TabAdminComponent') {
    this.component = TabAdminComponent;
      
  
  }
  else if(component === 'TabClientComponent'){
    this.component = TabClientComponent;

  }
  else if(component === 'TabFournisseurComponent'){
    this.component = TabFournisseurComponent;
  } 
  else if(component === 'AddAdminComponent'){
    this.component = AddAdminComponent;
  }   else if(component === 'SignupComponent'){
    this.component = SignupComponent;
  }   else if(component === 'AddFournisseurComponent'){
    this.component = AddFournisseurComponent;
  } 
  else if(component === 'TabContactComponent'){
  this.component = TabContactComponent;
} 
else if(component === 'TabOrdersComponent'){
  this.component = TabOrdersComponent;
} 
  else{
    this.component = TabGiftComponent;

    
  }

  
}


search(){
  this.userService.searchUser(this.user).subscribe
  ((data)=>{
         console.log(data.users);
         this.isDesplay=!this.isDesplay;
         this.users=data.users;

  })

}

deleteUser(id:any){
  this.userService.deleteUser(id).subscribe((data)=>{


    console.log(data.message);
    this.userService.getUsers().subscribe(
      (data)=>{
        this.users=data.users;
      }
    )
 
})
}

}



