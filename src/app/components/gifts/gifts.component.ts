import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  gifts:any;
  tabGifts:any=[];
  connectedUser:any;
  order:any={};
  idFournisseur:any;

  message:any;
  id:any;
  gift:any={};
  BebeTab:any=[];
  femmeTab:any=[];
  hommeTab:any=[];
  enfantTab:any=[];
  giftst:any=[];
  constructor(private giftService:GiftService ,private router:Router, private orderService:OrderService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.giftService.getGifts().subscribe((data)=>{
      console.log(data.gifts);
      this.gifts = data.gifts;
      for (let i = 0; i<8; i++) {        
        if(this.gifts[i].destinataire == "Femme")
        {
        this.femmeTab.push(this.gifts[i]);
        console.log("femme",this.femmeTab);
        
  
        
        }  
        
        else if(this.gifts[i].destinataire == "Homme")
        {
        this.hommeTab.push(this.gifts[i]);
        console.log("hommeTab",this.hommeTab);
        
        
        } 
  
        else if(this.gifts[i].destinataire == "Enfant")
        {
        this.enfantTab.push(this.gifts[i]);
        console.log("soldeVetement",this.enfantTab);
        
        } 
        else if(this.gifts[i].destinataire == "Bébé")
        {
        this.BebeTab.push(this.gifts[i]);
        console.log("soldeVetement",this.BebeTab);
        
        } else{
          this.giftst.push(this.gifts[i]);

        }
        
    
      }
      
    
    
    })

      
  }

  displayGift(id:any){
    this.router.navigate([`displayGift/${id}`]);
     } 


     validateCommande(gift:any){
   
      this.order.idClient =this.connectedUser._id;
      console.log("user",this.order.idClient);
      this.order.idGift =gift._id;
      console.log("gift",this.order.idGift);
  
      this.order.idFornisseur=gift.idFornisseur;
      console.log("fournisseur",this.order.idFornisseur);
  
        this.order.Qty="1";
          this.orderService.createOrder(this.order).subscribe((data)=>{
            console.log(data.message);
            this.message=data.message;
            
           
              })}



              addlikes(id){  
                let idLike= JSON.parse(localStorage.getItem("Like") || "1");
                   let like = {
                    idLike: id,
                    idUser:this.connectedUser._id,
                    
                 
                   };
                   let likes = JSON.parse(localStorage.getItem("likes") || "[]");
                   likes.push(like);
                   localStorage.setItem("likes", JSON.stringify(likes));
                   localStorage.setItem("idLike", idLike + 1);
               
               
             
             }
}
