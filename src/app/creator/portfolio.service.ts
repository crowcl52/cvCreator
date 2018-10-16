import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetPortfoliosAction, UnSetPortfoliosAction } from './portfolio/portfolio.action';
import { PortfolioModel } from './models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  userSubscription: Subscription = new Subscription();
  fbSubscription: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState> ) { }

  initPortfolioListener() {
    this.userSubscription = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    )
      .subscribe(auth => {
        this.portfolioItems(auth.user.uid)
      })
  }

  private portfolioItems(uid: string) {
    this.fbSubscription = this.afDB.collection(`${uid}/portfolio/items`).snapshotChanges()
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
        this.store.dispatch( new SetPortfoliosAction(colection) );
      });
  }

  createPortfolio(portfolio: PortfolioModel){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/portfolio`).collection('items').add({...portfolio});
  }

  deletePortfolio(uid: string){
    const user = this.authService.getUSer();
    return this.afDB.doc(`${user.uid}/portfolio/items/${uid}`).delete();
  }

  portfolioUnsubscribe(){
    this.fbSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.store.dispatch(new UnSetPortfoliosAction());
  }

}
