import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  public getGifts(){ 
       return this.httpClient.get<{gifts:any}>(this.SERVER_URL + '/api/allGifts');
  }

  public getGift(giftId:any){
       return this.httpClient.get<{gift:any}>(`${this.SERVER_URL + '/api/allGifts'}/${giftId}`); 
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

  public deleteGift(giftId){
      return this.httpClient.delete<{message:string}>(`${this.SERVER_URL + '/api/allGifts'}/${giftId}`)
  }
  public updateGift(gift){
    return this.httpClient.put<{message:string}>(`${this.SERVER_URL + '/api/allGifts'}/${gift._id}`,gift)
}
public getMyGifts(giftId){
  return this.httpClient.get<{myGifts:any}>(`${this.SERVER_URL + '/api/allMyGifts'}/${giftId}`); 
}

public searchGift(gift:any){ 
  return this.httpClient.post<{gifts:any}>(this.SERVER_URL + '/api/searchGift',gift);
}


}