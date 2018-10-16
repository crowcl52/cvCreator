import { Injectable } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WorkModel } from './models/work.model';
import { UnSetWorksAction, SetWorksAction } from './work/work.actions';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  userSubscription: Subscription = new Subscription();
  fbSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState>) { }

  initWorkListener() {
    this.userSubscription = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    )
      .subscribe(auth => {
        this.workItems(auth.user.uid)
      })
  }

  private workItems(uid: string) {
    this.fbSubscription = this.afDB.collection(`${uid}/works/items`).snapshotChanges()
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
        this.store.dispatch( new SetWorksAction(colection) );
      });
  }

  createWork(work: WorkModel){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/works`).collection('items').add({...work});
  }

  deleteWork(uid: string){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/works/items/${uid}`).delete();
  }

  workUnsubscribe(){
    this.fbSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.store.dispatch(new UnSetWorksAction());
  }

}
