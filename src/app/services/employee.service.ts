import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from  "@angular/fire/auth";
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { CookieService } from 'ngx-cookie-service';
export interface Employee
{

    Id: string,
    Email: string,
    Password: string,
    Firstname : string,
    Lastname : string,
    Phone : string ,
    Address : string,
    Birthday : Date ,
    Image : string,
    Position : number ,
    Status : number 
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData : Employee;
  list : Employee[]
  data : Employee;
  ls: {};
  constructor(private firebase : AngularFireDatabase,private af:AngularFireAuth,private api:ApiService,private http : HttpClient,private service: AuthService,private cookieService: CookieService) { }
  resetForm() {
    this.formData = {
      Id:'',
      Email: '',
      Password: '',
      Firstname : '',
      Lastname : '',
      Phone : '' ,
      Address : '',
      Birthday : new Date() ,
      Image : 'data:image/jpeg;base64,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',
      Position : 1 ,
      Status : 1
    };
  }
  getAll(): Observable<any> {
    return  this.http.get<any>(this.api.Url.employee);
    }
  showModal(obj: Employee) {
    // if (event != null) {
    //   event.preventDefault();
    // }
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      this.data = obj;
    } else {
      this.resetForm();
    }
  }

 async refesh()
  { 
    this.list=[];
    this.list.length = 0;
    await this.firebase.database.ref('Employee').on('value',(value)=>
    {
      value.forEach((doc)=>
      {
        this.list.push({       
          Id: doc.toJSON()["Id"],
          Email: doc.toJSON()["Email"],
          Password: doc.toJSON()["Password"],
          Firstname : doc.toJSON()["Firstname"],
          Lastname : doc.toJSON()["Lastname"],
          Phone : doc.toJSON()["Phone"] ,
          Address : doc.toJSON()["Address"],
          Birthday : doc.toJSON()["Birthday"] ,
          Image : doc.toJSON()["Image"],
          Position : doc.toJSON()["Position"] ,
          Status : doc.toJSON()["Status"] 
        });
      });
      return true;
    });
  }
 async insert(form :NgForm)
 {
   await  this.af.auth.createUserWithEmailAndPassword(form.value["Email"],form.value["Password"]).then(()=>
   this.firebase.database.ref('Employee').push(
    form.value
  ));
}
}
