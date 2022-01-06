import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-gift',
  templateUrl: './display-gift.component.html',
  styleUrls: ['./display-gift.component.css']
})
export class DisplayGiftComponent implements OnInit {
  connectedUser:any;
  order:any={};
  id:any;
  gift:any={};
  message:any;
  idFournisseur:any;
  mygift:any={};
  gifts:any;
  Qty:any;
  users:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
   private giftService:GiftService,private orderService:  OrderService,private userService:UserService) { }

  ngOnInit() {
  
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

this.giftService.getGift(this.id).subscribe(
  (data)=>{
this.gift=data.gift;    
console.log(this.gift);




  }
)

this.giftService.getGifts().subscribe(
  (data)=>{
this.gifts=data.gifts;    

  }
)
this.userService.getUsers().subscribe(
  (data)=>{
this.users=data.users;    

  }
)


this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));



  }

  validateCommande(){
   
    this.order.idClient =this.connectedUser._id;
    console.log("user",this.order.idClient);
    this.order.idGift =this.id;
    console.log("gift",this.order.idGift);
    this.order.idFornisseur=this.gift.idFornisseur;

    console.log("fournisseur",this.order.idFornisseur);

    this.order.prix=this.gift.prix;
    console.log(this.order.prix);
    

        this.orderService.createOrder(this.order).subscribe((data)=>{
          console.log(data.message);
          this.message=data.message;
          
         
            })}

            displayUser(id:any){
              this.router.navigate([`displayUser/${id}`]);
               }
             

          }
                
           
          
      
    