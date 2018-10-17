import { Injectable } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetSkillsAction } from '../creator/skill/skill.actions';
import { InfoModel } from '../creator/models/info.model';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  skillSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState>) { }

  skillItems(uid: string) {
    return this.afDB.collection(`${uid}/skills/skills`).snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      );
  }

  InfoItem(uid: string) {
    return this.afDB.doc(`${uid}/info`).valueChanges()
  }

  workItems(uid: string) {
    return this.afDB.collection(`${uid}/works/items`).snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      );
  }

  educationItems(uid: string) {
    return this.afDB.collection(`${uid}/education/items`).snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      );
  }

  portfolioItems(uid: string) {
    return this.afDB.collection(`${uid}/portfolio/items`).snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      );
  }

}
