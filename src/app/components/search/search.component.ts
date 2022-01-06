import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GiftService } from "src/app/services/gift.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  gifts: any;
  tabGifts: any = [];
  connectedUser: any;
  order: any = {};
  idFournisseur: any;
  isDesplay: any = false;

  message: any;
  id: any;
  gift: any = {};
  SearchForm: FormGroup;
  giftsp: any;
  inputValue:any;
  inputValue2:any;
  founded:any;
  constructor(
    private formBuilder: FormBuilder,
    private giftService: GiftService,
    private router: Router,
    private orderService: OrderService,@Inject(DOCUMENT) document
  ) {
    
  }


  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    this.giftService.getGifts().subscribe((data) => {
      console.log(data.gifts);
      this.gifts = data.gifts;
      for (let i = 0; i < this.gifts.length; i++) {
        this.tabGifts.push(this.gifts[i]);
      }
    });

    this.SearchForm = this.formBuilder.group({
      category: [""],
      occasion: [""],
      destinataire: [""],
    });
    
    
  }
onKey(event) {this.inputValue = event.target.value; ;

  }
  onKey2(event) {this.inputValue2 = event.target.value; ;

  }
  displayGift(id: any) {
    this.router.navigate([`displayGift/${id}`]);
  }

  validateCommande(gift) {
    this.order.idClient = this.connectedUser._id;
    console.log("user", this.order.idClient);
    this.order.idGift = gift._id;
    console.log("gift", this.order.idGift);

    this.order.idFornisseur = gift.idFornisseur;
    console.log("fournisseur", this.order.idFornisseur);

    this.order.Qty = "1";
    this.orderService.createOrder(this.order).subscribe((data) => {
      console.log(data.message);
      this.message = data.message;
    });
  }

  search() {

   
    this.giftService.searchGift(this.gift).subscribe((data) => {
      console.log(data.gifts);
      this.gifts = data.gifts;
      
      console.log(this.inputValue);
      
      console.log(this.inputValue2);
      
      for (let i = 0; i < this.gifts.length; i++) {
        
        if (
          this.inputValue < this.gifts[i].prix &&
          this.inputValue2 > this.gifts[i].prix
        ) 
        {
          this.gifts = this.gifts;
          console.log(this.gifts);
          this.isDesplay = !this.isDesplay;

          
          
        }
      }
    });
    
  }
  
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
