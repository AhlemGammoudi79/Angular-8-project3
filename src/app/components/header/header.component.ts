import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connectedUser:any={};
  user:any={};
  LoginForm:FormGroup;
  myOrders:any;
  nb:any=0;
  constructor(private formLog:FormBuilder ,private orderService:OrderService, private router:Router,private userService:UserService) { }

ngOnInit() {
  this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");



  this.LoginForm= this.formLog.group({
    email :[''],
    password :[''],
  
  })

  this.orderService.getMyOrders(this.connectedUser._id).subscribe(
    (data)=>{
    this.myOrders =data.myOrders;
    for (let i = 0; i < this.myOrders.length; i++) {
       
           this.nb++;
       
        
    }
 })


}
 
login(){

  this.userService.login(this.user).subscribe
  ((data)=>{
    console.log("finded User",data.findedUser);
if (data.findedUser.role) {
  localStorage.setItem("connectedUser",JSON.stringify(data.findedUser));
  switch (data.findedUser.role) {
    case 'admin':this.router.navigate(['dashboardAdmin']);
    break;
    case 'client':this.router.navigate(['']);
    break;
    case 'fournisseur':this.router.navigate(['']);
    break;
    default:
      break;
  } 
}
})};

reloadComponent() {
  let currentUrl = this.router.url;
  // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
  // pour un re-rendu à une date ultérieure.
  //*****mettre en cache */
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //gerer une demande navigation vers l'url actuel
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);


}
    

logOut() {
  localStorage.removeItem("connectedUser");
  this.router.navigate(['']);

}



}