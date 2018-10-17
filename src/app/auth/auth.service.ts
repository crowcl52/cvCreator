import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase';

import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { InfoModel } from '../creator/models/info.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth:AngularFireAuth, private afDB: AngularFirestore ,private router:Router,
               private store: Store<AppState>) { }

  private userSubscription: Subscription = new Subscription();

  private user: User;

  initAuthListener(){
    this.userSubscription = this.afAuth.authState.subscribe( (fbUser: firebase.User) =>{
      if(fbUser){
        this.afDB.doc(`${ fbUser.uid }/user`).valueChanges().subscribe((userObj: any) => {
          const newUser = new User(userObj);
          this.store.dispatch( new SetUserAction(newUser));
          this.user = newUser;
        })
      }else{
        this.user = null;
        this.userSubscription.unsubscribe();
      }
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
  // Create user
  createUSer(email: string,name: string,password: string){
    //Activate loading
    this.store.dispatch(new ActivateLoadingAction() );
    //create user in fb
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(data=>{
      const user: User = {
        uid: data.user.uid,
        nombre: name,
        email: data.user.email
      }
      
      this.afDB.doc(`${user.uid}/user`).set( user).then(data =>{
        // create model item
        this.createInfo(user).then(data=>{
          this.store.dispatch(new DesactivateLoadingAction() );
          this.router.navigate(['/']);
        }).catch(err=>{
          this.store.dispatch(new DesactivateLoadingAction() );
          swal("error",err.message,"error");
        })
      })

    }).catch(err=>{
      this.store.dispatch(new DesactivateLoadingAction() );
      swal("error",err.message,"error");
    })
  }
  // Login
  logIn(email: string, password:string){
    // Activate loading
    this.store.dispatch(new ActivateLoadingAction() );
    // Check if user exist
    this.afAuth.auth.signInWithEmailAndPassword(email,password).then(data=>{
      this.store.dispatch(new DesactivateLoadingAction() );
      this.router.navigate(['/']);
    }).catch(err=>{
      this.store.dispatch(new DesactivateLoadingAction() );
      swal("error",err.message,"error");
    })
  }
  // logout
  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  // Create info
  createInfo(user){
    const info:InfoModel = new InfoModel({
      image:'',
      name: 'John Doe',
      title: 'Engineer',
      email: 'mail@mail.com',
      country: 'México',
      city: 'Guadalajara',
      age: 18,
      phone: '333333333',
      facebook: null,
      twitter: null,
      instagram: null,
      pinterest: null,
      linkedin: null,
      github: null,
      bgColor: 'light',
      contColor: 'white',
      titleColor: 'dark',
      txtColor: 'dark',
      fooColor: 'secondary',
      socColor: 'info',
      iconColor: 'info',
    })
    return this.afDB.doc(`${user.uid}/info`).set({...info});
  }

  getUSer(){
    return {... this.user};
  }

}
