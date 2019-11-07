import { Component,OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/styles/login.css'],
})
export  class  LoginComponent  implements  OnInit {
  email="";
  password="";
  message="";
  showpass=false;
  constructor(private  service:  AuthService) { }
  ngOnInit() {
  }
  login()
  {
      this.service.login(this.email,this.password);
      this.message=this.service.errorMessage;
  }
  showpss()
  {
    this.showpass=true;
    var x = document.getElementById("password");
    x.setAttribute('type','text');
  }
  hidpss()
  {
    this.showpass=false;
    var x = document.getElementById("password");
    x.setAttribute('type','password');
  }
 }
