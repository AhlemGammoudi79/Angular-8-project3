import { HttpClient } from '@angular/common/http';
// 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  public getUsers(){ 
       return this.httpClient.get<{users:any}>(this.SERVER_URL + '/api/allUsers');
  }
  
  public login(user:any){ 
    return this.httpClient.post<{findedUser:any}>(this.SERVER_URL + '/api/login',user);
}

  public getUser(userId){
       return this.httpClient.get<{user:any}>(`${this.SERVER_URL + '/api/allUsers'}/${userId}`); 
  }
  public createGift(gift: any,img:File){
    let formData = new FormData();
    formData.append('name',gift.name);
    formData.append('category',gift.category);
    formData.append('occasion',gift.occasion);
    formData.append('age',gift.age);
    formData.append('prix',gift.prix);
    formData.append('stock',gift.stock);
    formData.append('destinataire',gift.destinataire);
    formData.append('idFornisseur',gift.idFornisseur);
    formData.append('img',img);
    
    
          return this.httpClient.post<{message:string}>(`${this.SERVER_URL + '/api/createGift'}`,formData)
        }



  public createUser(user: any){
      return this.httpClient.post<{message:string}>(`${this.SERVER_URL + '/api/createUserC'}`, user)
  }

  public deleteUser(userId){
      return this.httpClient.delete<{message:string}>(`${this.SERVER_URL + '/api/allUsers'}/${userId}`)
  }

  public updateUser(user:any){
    console.log("here in updateUser service");
    
    return this.httpClient.put<{message:string}>(`${this.SERVER_URL + '/api/allUsers'}/${user._id}`, user)
  }


  public getPdf()
{ 

  return this.httpClient.get<{message: String}>(this.SERVER_URL +  '/users/generateFile/pdf'); }

  public createFournisseur(user: any,img:File){
    let formData = new FormData();
    formData.append('firstName',user.firstName);
    formData.append('lastName',user.lastName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('tel',user.tel);
    formData.append('role',user.role);
    formData.append('ville',user.ville);
    formData.append('statut',user.statut);
 
    formData.append('dateOfBirth',user.dateOfBirth);
    formData.append('description',user.description);
    formData.append('img',img);
      return this.httpClient.post<{message:string}>(`${this.SERVER_URL + '/api/createUser'}`, formData)
  }


  public searchUser(chef:any){ 
    return this.httpClient.post<{users:any}>(this.SERVER_URL + '/api/searchUser',chef);
  }

}