import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetEducationsAction, UnSetEducationsAction } from './school/education.action';
import { EducationModel } from './models/education.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  userSubscription: Subscription = new Subscription();
  fbSubscription: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState> ) { }

  initEducationListener() {
    this.userSubscription = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    )
      .subscribe(auth => {
        this.educationItems(auth.user.uid)
      })
  }

  private educationItems(uid: string) {
    this.fbSubscription = this.afDB.collection(`${uid}/education/items`).snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((colection: any[]) => {
        this.store.dispatch( new SetEducationsAction(colection) );
      });
  }

  createEducation(education: EducationModel){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/education`).collection('items').add({...education});
  }

  deleteWork(uid: string){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/education/items/${uid}`).delete();
  }

  educationUnsubscribe(){
    this.fbSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.store.dispatch(new UnSetEducationsAction());
  }

}
