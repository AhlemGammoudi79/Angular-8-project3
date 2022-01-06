import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-gift-discounts',
  templateUrl: './gift-discounts.component.html',
  styleUrls: ['./gift-discounts.component.css']
})
export class GiftDiscountsComponent implements OnInit {

  gifts:any;
  soldeVetement:any=[];
  cadeauPersonalise:any=[];
  cadeauDeco:any=[];
  constructor(private giftService:GiftService,private router:Router ) { }

  ngOnInit() {
    this.giftService.getGifts().subscribe((data)=>{
      console.log(data.gifts);
      this.gifts = data.gifts;
      for (let i = 0; i<this.gifts.length; i++) {        
      if(this.gifts[i].category == "Cadeaux personnalisés")
      {
      this.cadeauPersonalise.push(this.gifts[i]);
      console.log("cadeauPersonalise",this.cadeauPersonalise);
      

      
      }  
      
      else if(this.gifts[i].category == "Déco et Intérieur")
      {
      this.cadeauDeco.push(this.gifts[i]);
      console.log("cadeauDeco",this.cadeauDeco);
      
      
      } 

      else if(this.gifts[i].category == "Vêtements Bijoux et  Accessoires")
      {
      this.soldeVetement.push(this.gifts[i]);
      console.log("soldeVetement",this.soldeVetement);
      
      } 
  
    }
    
    })
      
  }



  displayGift(id:any){
    this.router.navigate([`displayGift/${id}`]);
     }
}
