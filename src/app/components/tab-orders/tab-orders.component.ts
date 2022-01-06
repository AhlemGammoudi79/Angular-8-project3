import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.css']
})
export class TabOrdersComponent implements OnInit {
  orders:any;
  users:any;
  gifts:any;
  stotal:any=0;
  total:any=0;
  gift:any={};
  id:any;
  subTotal:any;
  constructor( private activatedRoute:ActivatedRoute,private orderService:OrderService ,private router:Router,private giftService:GiftService ,private userService:UserService ,) { }

  ngOnInit() {


    this.orderService.getOrders().subscribe((data)=>{
      console.log(data.orders);
      this.orders = data.orders;
      for (let i = 0; i < this.orders.length; i++) {
        this.total = Number(this.orders[i].prix) * Number(this.orders[i].Qty);
       this.stotal = this.total +this.stotal;

   }
   this.subTotal= Number(this.stotal) * 0.1;
console.log(this.total);

    
    })
    
      this.userService.getUsers().subscribe((data)=>{
        console.log(data.users);
        this.users = data.users;})
      
        
        this.giftService.getGifts().subscribe((data)=>{
          console.log(data.gifts);
          this.gifts = data.gifts;})
        
          }




      



      deleteGift(id:any){
        this.orderService.deleteOrder(id).subscribe((data)=>{
      
      
          console.log(data.message);
          this.orderService.getOrders().subscribe(
            (data)=>{
              this.orders=data.orders;
            }
          )
       
      })
      }
      
  

  }


