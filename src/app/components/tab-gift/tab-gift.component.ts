import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-tab-gift',
  templateUrl: './tab-gift.component.html',
  styleUrls: ['./tab-gift.component.css']
})
export class TabGiftComponent implements OnInit {
  gifts:any;
  constructor( private giftService:GiftService ,private router:Router) { }

  ngOnInit() {


    this.giftService.getGifts().subscribe((data)=>{
      console.log(data.gifts);
      this.gifts = data.gifts;})
    
      }

      deleteGift(id:any){
        this.giftService.deleteGift(id).subscribe((data)=>{
      
      
          console.log(data.message);
          this.giftService.getGifts().subscribe(
            (data)=>{
              this.gifts=data.gifts;
            }
          )
       
      })
      }
      
      displayGift(id:any){
        this.router.navigate([`displayGift/${id}`]);
         }


  }


