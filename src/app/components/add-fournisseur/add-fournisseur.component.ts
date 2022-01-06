import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../confirmPwd';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {

ajoutFournisseurForm:FormGroup;
imagePreview:any;

  constructor(private formS:FormBuilder,private userService: UserService) { }
  ngOnInit() {
    this.ajoutFournisseurForm= this.formS.group({
      firstName :['',[Validators.minLength(3),Validators.required]],
      lastName :['',[Validators.minLength(5),Validators.required]],
      email :['',[Validators.email,Validators.required]],
      password :['',[Validators.minLength(8),Validators.required]],
      ville :['',[Validators.minLength(3),Validators.required]],
      confirmPasword :['',[Validators.required]],
      tel :['',[Validators.minLength(8),,Validators.maxLength(13),Validators.required]],
      
      img:[''],
      dateOfBirth:[''],
      description:[''],

    },
    {
    validator: MustMatch('password','confirmPasword')
    }
    );
    }
  signup(user:any){
 user.role="fournisseur";
 user.statut="en attent";

this.userService.createFournisseur(user,this.ajoutFournisseurForm.value.img).subscribe
((data)=>{
  console.log(data.message);
});


}
onImageSelected(event: Event) {
  //Selection du fichier
  const file = (event.target as HTMLInputElement).files[0];
  // Ajout d'un attribut img dans l'objet plat
  this.ajoutFournisseurForm.patchValue({ img: file });
  // Mise à jour des valeurs du form
  this.ajoutFournisseurForm.updateValueAndValidity();
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


