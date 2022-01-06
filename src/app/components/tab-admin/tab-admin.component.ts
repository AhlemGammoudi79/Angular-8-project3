import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.component.html',
  styleUrls: ['./tab-admin.component.css']
})
export class TabAdminComponent implements OnInit {

  users:any;
 
  tabAdmins:any=[];

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
      if(this.users[i].role =="admin")
      {
      this.tabAdmins.push(this.users[i]);
      
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
  editUser(id:any,role:any){
    if (role == "admin") {
      this.router.navigate([`editUser/${id}`]);
    } 
    }



}
