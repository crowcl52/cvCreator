import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetInfoAction, UnSetInfoAction } from './info/info.action';
import { InfoModel } from './models/info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  userSubscription: Subscription = new Subscription();
  fbSubscription: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState> ) { }

  initInfoListener() {
    this.userSubscription = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    )
      .subscribe(auth => {
        this.InfoItem(auth.user.uid)
      })
  }

  private InfoItem(uid: string) {

    this.afDB.doc(`${uid }/info`).valueChanges().subscribe((userObj: any) => {
      const newUser = new InfoModel(userObj);
      this.store.dispatch( new SetInfoAction(newUser));
    })
  }

  updateInfo(info: InfoModel){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/info`).update({...info});
  }

  infoUnsubscribe(){
    this.fbSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.store.dispatch(new UnSetInfoAction());
  }

}
