import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase';

import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth:AngularFireAuth, private afDB: AngularFirestore ,private router:Router) { }

  initAuthListener(){
    this.afAuth.authState.subscribe( (fbUser: firebase.User) =>{
      console.log(fbUser)
    });
  }

  isAuth(){
    return this.afAuth.authState.pipe(
      map( fbUser => {
        if(fbUser == null){
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    )
  }

  createUSer(email: string,name: string,password: string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(data=>{
      console.log(data);
      const user: User = {
        uid: data.user.uid,
        nombre: name,
        email: data.user.email
      }
      
      this.afDB.doc(`${user.uid}/user`).set( user).then(data =>{
        console.log(data)
        this.router.navigate(['/']);
      })

    }).catch(err=>{
      swal("error",err.message,"error");
    })
  }

  logIn(email: string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password).then(data=>{
      this.router.navigate(['/']);
    }).catch(err=>{
      swal("error",err.message,"error");
    })
  }

  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }


}
