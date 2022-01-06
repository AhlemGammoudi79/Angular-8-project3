import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { GiftService } from 'src/app/services/gift.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-dashboard',
  templateUrl: './tab-dashboard.component.html',
  styleUrls: ['./tab-dashboard.component.css']
})
export class TabDashboardComponent implements OnInit {
  nbgift:any=0;
  nbClient:any=0;
  nbFournisseur:any=0;
  nbContact:any=0;
  contacts:any;
users:any;
gifts:any;

nbOrders:any=0;
orders:any;
  constructor(private router:Router,private userService: UserService
    ,private giftService:GiftService,private formBuilder:FormBuilder,private orderService:OrderService,private contactService:ContactService) { }
 
    ngOnInit() {
    
  
      this.userService.getUsers().subscribe((data)=>{
        console.log(data.users);
        this.users = data.users;
        for (let i = 0; i < this.users.length; i++) {
         
          this.nbClient++;
      
       
      }
  
    })
  
  
  
  this.giftService.getGifts().subscribe((data)=>{
    console.log(data.gifts);
    this.gifts = data.gifts;
    for (let i = 0; i < this.gifts.length; i++) {
         
      this.nbgift++;
  
   
  }
  
  })
  
  this.contactService.getMessageContacts().subscribe((data)=>{
    console.log(data.contacts);
    this.contacts = data.contacts;
    for (let i = 0; i < this.contacts .length; i++) {
         
      this.nbContact++;
  
   
  }
  
  })
  
  this.orderService.getOrders().subscribe((data)=>{
    console.log(data.orders);
    this.orders = data.orders;
    for (let i = 0; i < this.orders .length; i++) {
         
      this.nbOrders++;
  
   
  }
  
  })
  
  
  
    }
    

}
