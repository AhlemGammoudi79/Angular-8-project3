import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact:any={};

 addmessageForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private contactService: ContactService,private router:Router) { }

  ngOnInit() {



    this.addmessageForm= this.formBuilder.group({
      nom :[''],
      email :[''],
      message :[''],
   
    })


  }

  addMessage(){
  
  
  
      
this.contactService.createMessageContact(this.contact).subscribe
((data)=>{
  console.log(data.message);
});
       }}
    
    
  
