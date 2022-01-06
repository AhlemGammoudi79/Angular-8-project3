import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-fournisseur',
  templateUrl: './tab-fournisseur.component.html',
  styleUrls: ['./tab-fournisseur.component.css']
})
export class TabFournisseurComponent implements OnInit {

  users:any;
 
  tabFournisseur:any=[];

  user:any={};
  statut:any;
  constructor(private router:Router,private userService: UserService
    ) { }
  
  ngOnInit() {
  

    this.userService.getUsers().subscribe((data)=>{
      console.log(data.users);
      this.users = data.users;
      for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].role =="fournisseur")
      {
      this.tabFournisseur.push(this.users[i]);
      
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
confirmFornisseur(user:any){
  user.statut="confirmé";
  this.userService.updateUser(user).subscribe((data)=>{
    console.log(data.message);
});
}
}
