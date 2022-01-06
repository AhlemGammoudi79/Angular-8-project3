import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-fornisseur',
  templateUrl: './profil-fornisseur.component.html',
  styleUrls: ['./profil-fornisseur.component.css']
})
export class ProfilFornisseurComponent implements OnInit {
 plat:any={};
 id:any;
 cadeau:any;
plats:any;
 connectedUser:any;
 imagePreview:any;
 myGifts:any;
 messageAdd:any;
 user:any={};
 users:any=[];
 myCommandes:any=[];
 gifts:any=[];
 order:any;
 gift:any={};
 idFournisseur:any;
 myOrders:any=[];
 subTotal:any=0;
 total:any;

 constructor( private activatedRoute:ActivatedRoute,private giftService:GiftService,private router:Router, private orderService:OrderService,private userService:UserService) { }

 ngOnInit() {


 

  this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
 
  this.userService.getUser(this.connectedUser._id).subscribe(
    (data)=>{
  this.user=data.user;    

    }
  )


  this.giftService.getMyGifts(this.connectedUser._id).subscribe(
    (data)=>{
    this.myGifts =data.myGifts
  
  })



this.orderService.getMyCommand(this.connectedUser._id).subscribe((data)=>{
  this.myCommandes =data.myCommandes;
  console.log("myCommandes",this.myCommandes);

  for (let i = 0; i < this.myCommandes.length; i++) {
       this.total = Number(this.myCommandes[i].prix) * Number(this.myCommandes[i].Qty);
      this.subTotal = this.total +this.subTotal;
  }
     
})
 

  this.userService.getUsers().subscribe((data)=>{
    console.log(data.users);
    this.users = data.users;})
    this.giftService.getGifts().subscribe((data)=>{
      console.log(data.gifts);
      this.gifts = data.gifts;})

}
displayGift(id:any){
  this.router.navigate([`displayGift/${id}`]);
   }
 
   deleteGift(id:any){
    this.giftService.deleteGift(id).subscribe((data)=>{
     console.log(data.message);


      this.giftService.getMyGifts(this.connectedUser._id).subscribe(
        (data)=>{
          this.myGifts=data.myGifts;
        })
     })
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
  editGift(id){
    this.router.navigate([`editGift/${id}`]);


  }


  getPdf(){
    

    this.orderService.getPdf().subscribe( (data)=>{ console.log(data.message);}
    )}



  
}
