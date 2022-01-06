import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
SERVER_URL: string = "http://localhost:3000";
constructor(private httpClient: HttpClient) { }

public getMessageContacts(){ 
     return this.httpClient.get<{contacts:any}>(this.SERVER_URL + '/api/allMessageContact');
}



public getMessageContact(userId){
     return this.httpClient.get<{user:any}>(`${this.SERVER_URL + '/api/allMessageContact'}/${userId}`); 
}


public createMessageContact(message: any){

    return this.httpClient.post<{message:string}>(`${this.SERVER_URL + '/api/createMessageContact'}`, message)
}

public deleteMessageContact(userId){
    return this.httpClient.delete<{message:string}>(`${this.SERVER_URL + '/api/allMessageContacts'}/${userId}`)
}





}