import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  errorMessage = "";
  loading= false;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.afAuth.auth.currentUser.getIdToken().then(token=>{   
        });

      } else {
        localStorage.setItem('user', null);
        this.router.navigate(['/login']);
      }
      
    })
    
   }
   async login(email: string, password: string) {
    this.loading=true;
    await this.afAuth.auth.signInWithEmailAndPassword(email, password).then
    (() => {

      this.router.navigate(['']);
      this.loading=false;
    }   
    ).catch( () =>{
      this.loading=false;
      this.errorMessage = "Sai Tài Khoản Hoặc Mật Khẩu";
    }
    );

  }
    async register(email: string, password: string) {
      var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      this.sendEmailVerification();
  }
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['admin/verify-email']);
  }
    async sendPasswordResetEmail(passwordResetEmail: string) {
      return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
    get isLoggedIn(): boolean {
      const  user  =  JSON.parse(localStorage.getItem('user'));
      return  user  !==  null;
  }
async getToken()
{
  return await  this.afAuth.auth.currentUser.getIdToken();
}
  async  loginWithGoogle(){
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['admin/list']);
  }
}
