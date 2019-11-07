import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { 
    
  }
  baseUrl ='https://adminiq-e827c.firebaseio.com/';
  Url =
  {
    contest:this.baseUrl+"Content.json/",
    employee:this.baseUrl+"Employee.json",
    customer:this.baseUrl+"Customer.json/",
    topic:this.baseUrl+"Topic.json/",
    question:this.baseUrl+"Question.json/",
    result:this.baseUrl+"Result.json/",
    include:this.baseUrl+"/Include.json/",
  }
}
