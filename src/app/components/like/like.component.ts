import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
likes:any;
gifts:any;
connectedUser:any;
  constructor(private giftService:GiftService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    this.likes = JSON.parse(localStorage.getItem("likes"));
console.log(this.likes);
this.giftService.getGifts().subscribe((data) => {
  if (this.connectedUser) {
    
  
  console.log(data.gifts);
  this.gifts = data.gifts;

  }
 
})

  


  }}
