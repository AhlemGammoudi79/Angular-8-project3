import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-tab-contact',
  templateUrl: './tab-contact.component.html',
  styleUrls: ['./tab-contact.component.css']
})
export class TabContactComponent implements OnInit {

  contacts:any;
 
  tabContact:any=[];

  user:any;
  statut:any;
  constructor(private router:Router,private contactService: ContactService
    ) { }
  
  ngOnInit() {
  

    this.contactService.getMessageContacts().subscribe((data)=>{
      console.log(data.contacts);
      this.contacts = data.contacts;
  

  })

}
deleteContact(id:any){
  this.contactService.deleteMessageContact(id).subscribe((data)=>{


    console.log(data.message);
    this.contactService.getMessageContacts().subscribe(
      (data)=>{
        this.contacts=data.contacts;
      }
    )
 
})
}

}
