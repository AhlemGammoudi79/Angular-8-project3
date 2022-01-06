import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-client',
  templateUrl: './tab-client.component.html',
  styleUrls: ['./tab-client.component.css']
})
export class TabClientComponent implements OnInit {

  users:any;
 
  tabClient:any=[];

  user:any;
  statut:any;
  constructor(private router:Router,private userService: UserService
    ) { }
  
  ngOnInit() {
  

    this.userService.getUsers().subscribe((data)=>{
      console.log(data.users);
      this.users = data.users;
      for (let i = 0; i < this.users.length; i++) {
        // chne3ml filtrage
      if(this.users[i].role =="client")
      {
      this.tabClient.push(this.users[i]);
      
      }  
   
      
      }

  })

}
deleteUser(id:any){
  this.userService.deleteUser(id).subscribe((data)=>{


    console.log(data.message);
    this.userService.getUsers().subscribe(
      (data)=>{
        this.users=data.users;
      }
    )
 
})
}

}
