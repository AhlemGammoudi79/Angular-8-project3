import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {


  user:any={};
  id:any;
title:string;
users:any;
firstNameError:any=false;
  addAdminForm:FormGroup;
  imagePreview:any;
  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private userService: UserService,private router:Router) { }

  ngOnInit() {



    this.addAdminForm= this.formBuilder.group({
      firstName :[''],
      lastName :[''],
      email :[''],
      password :[''],
      confirmPasword :[''],
      tel :[''],
      img :[''],

    })

    this.id =this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.title="Modifier Administrateur";

        this.userService.getUser(this.id).subscribe((data)=>{
           this.user = data.user;
    }  
        )
}

    else
    {
      this.title="Ajouter un administrateur";

    }
  }

    addAdmin(user:any){
      if (this.id) {
 
  
    this.userService.updateUser(this.user).subscribe((data)=>{
      console.log(data.message);
  });
  
  
    }
  
  
       else 
       {
        // add
  
        this.user.role="admin";
        this.userService.createFournisseur(user,this.addAdminForm.value.img).subscribe
        ((data)=>{
          console.log(data.message);
        });
       }}



       onImageSelected(event: Event) {
        //Selection du fichier
        const file = (event.target as HTMLInputElement).files[0];
        this.addAdminForm.patchValue({ img: file });
        // Mise à jour des valeurs du form 
        this.addAdminForm.updateValueAndValidity();
        // Creation d'une variable reader pour lire le contenu de fichiers
        const reader = new FileReader();
        //Déclenchement du event load lors d'une lecture de fichier avec succès
        reader.onload = () => {
        //affecter le résultat de la lecture dans la variable imagePreview
        this.imagePreview = reader.result as string
        };
        // lecture du contenu du fichier  Blob ou File 
        reader.readAsDataURL(file);
        }
       
    }
    
  
