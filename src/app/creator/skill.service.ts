import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SkillModel } from './models/skill.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetSkillsAction, UnSetSkillsAction } from './skill/skill.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  userSubscription: Subscription = new Subscription();
  fbSubscription: Subscription = new Subscription();

  constructor( private afDB:AngularFirestore, public authService: AuthService, private store: Store<AppState> ) { }

  initSkillListener(){
   this.userSubscription = this.store.select('auth').pipe(
      filter( auth => auth.user !== null )
    )
      .subscribe(auth=>{
        this.skillItems(auth.user.uid)
    })
  }

  private skillItems(uid: string){
    this.fbSubscription = this.afDB.collection(`${uid}/skills/skills`).snapshotChanges()
    .pipe(
      map( docData =>{
        return docData.map( doc=>{
          return{
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      })
    )
    .subscribe( (colection: any[]) =>{
      this.store.dispatch( new SetSkillsAction(colection) );
    });
  }

  createSkill(skill: SkillModel){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/skills`).collection('skills').add({...skill});
  }

  deleteSkill(uid: string){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/skills/skills/${uid}`).delete();
  }

  skillUnsubscribe(){
    this.fbSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.store.dispatch(new UnSetSkillsAction());
  }


}
