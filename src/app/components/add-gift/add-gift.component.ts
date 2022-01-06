import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.css']
})
export class AddGiftComponent implements OnInit {
  gift:any={};
  id:any;
gifts:any;
  connectedUser:any;
  imagePreview:any;

 
  myPlats:any=[];
  messageAdd:any;
  title:any;
  addGiftForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private giftService:GiftService,private router:Router) { }
 
  ngOnInit() {
    this.addGiftForm= this.formBuilder.group({

      name :['',[Validators.minLength(3),Validators.required]],
      category :['',[Validators.required]],
      occasion  :['',[Validators.required]],
      destinataire :['',[Validators.required]],
      age :['',[Validators.required]],
      prix :['',[Validators.required]],
      stock :['',[Validators.required]],

      img:[''],
    })
   this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
     this.id =this.activatedRoute.snapshot.paramMap.get('id');
       if(this.id)
       {
         this.title="Modifier un Cadeau";
   
         this.giftService.getGift(this.id).subscribe((data)=>{
           this.gift= data.gift;
    }  
        )
       }
         else{
           this.title="Ajouter un cadeau";
         }




  }
  addGift(){
   
    if (this.id){
      this.giftService.updateGift(this.gift).subscribe((data)=>{
        console.log(data.message);
    })
    


    }
    else{

    
     this.gift.idFornisseur =this.connectedUser._id;
 console.log(this.gift.idFornisseur);
 
     this.giftService.createGift(this.gift,this.addGiftForm.value.img).subscribe
     ((data)=>{
 
       console.log(data.message);
       this.messageAdd=data.message;
     });
   }}
     onImageSelected(event: Event) {
       //Selection du fichier
       const file = (event.target as HTMLInputElement).files[0];
       // Ajout d'un attribut img dans l'objet plat/
       this.addGiftForm.patchValue({ img: file });
       // Mise à jour des valeurs du form 
       this.addGiftForm.updateValueAndValidity();
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
 