import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GiftService } from 'src/app/services/gift.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  myOrders:any;
  connectedUser:any;
  gifts:any;
  addOrderForm:FormGroup;
  total:any=0;
  gift:any;
  users:any;
  constructor(private orderService:OrderService,private giftService:GiftService,private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit() {
    this.addOrderForm= this.formBuilder.group({
     Qty :[''],
   
    })

    this.giftService.getGifts().subscribe((data)=>{
      console.log(data.gifts);
      this.gifts = data.gifts;
    })


    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));

    this.orderService.getMyOrders(this.connectedUser._id).subscribe(
      (data)=>{
      this.myOrders =data.myOrders;
  
 
    
    })
    this.userService.getUsers().subscribe((data)=>{
      console.log(data.users);
      this.users = data.users;})
 
  }
 


  deleteOrder(id:any){
    this.orderService.deleteOrder(id).subscribe((data)=>{
     console.log(data.message);


      this.orderService.getMyOrders(this.connectedUser._id).subscribe(
        (data)=>{
          this.myOrders=data.myOrders;
        })
     })
     }
     

     getPdf(){
      this.orderService.getPdf().subscribe( (data)=>{ console.log(data.message);}
      )}

}
