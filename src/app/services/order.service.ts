import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  public getOrders(){ 
       return this.httpClient.get<{orders:any}>(this.SERVER_URL + '/api/allOrders');
  }

  public getOrder(orderId){
       return this.httpClient.get<{order:any}>(`${this.SERVER_URL + '/api/allOrders'}/${orderId}`); 
  }
  public createOrder(order: any){
        return this.httpClient.post<{message:string}>(`${this.SERVER_URL + '/api/createOrder'}`,order)
    }

  public deleteOrder(orderId){
      return this.httpClient.delete<{message:string}>(`${this.SERVER_URL + '/api/allOrders'}/${orderId}`)
  }
  public updateOrder(order){
    return this.httpClient.put<{message:string}>(`${this.SERVER_URL + '/api/allOrders'}/${order._id}`,order)
}
public getMyOrders(orderId){
  return this.httpClient.get<{myOrders:any}>(`${this.SERVER_URL + '/api/allMyOrders'}/${orderId}`); 
}
public getMyCommand(orderId){
  return this.httpClient.get<{myCommandes:any}>(`${this.SERVER_URL + '/api/allMyCommand'}/${orderId}`); 
}




public getPdf()
{ 

  return this.httpClient.get<{message: String}>(this.SERVER_URL +  '/orders/generateFile/pdf'); }


}

