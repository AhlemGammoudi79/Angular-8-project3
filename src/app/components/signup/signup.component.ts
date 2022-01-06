import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../confirmPwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

signupForm:FormGroup;

  constructor(private formS:FormBuilder,private userService: UserService) { }
  ngOnInit() {
    this.signupForm= this.formS.group({
      firstName :['',[Validators.minLength(3),Validators.required]],
      lastName :['',[Validators.minLength(5),Validators.required]],
      email :['',[Validators.email,Validators.required]],
      password :['',[Validators.minLength(8),Validators.required]],
      confirmPasword :['',[Validators.required]],
      tel :['',[Validators.minLength(8),,Validators.maxLength(13),Validators.required]]
    },
    {
    validator: MustMatch('password','confirmPasword')
    }
    );
    
    }

  signup(user:any){
 user.role="client";
this.userService.createUser(user).subscribe
((data)=>{
  console.log(data.message);
});


}



}


