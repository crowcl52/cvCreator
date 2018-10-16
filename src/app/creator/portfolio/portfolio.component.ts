import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { PortfolioModel } from '../models/portfolio.model';
import { PortfolioService } from '../portfolio.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../../shared/ui.actions';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  showItem: boolean = false;
  areImg: boolean = false;

  portfolioForm: FormGroup;

  loadingSubscription: Subscription = new Subscription();
  loading: boolean = false;

  portfolios: PortfolioModel[] = [];

  imgcontainer: any;
  user: User;

  constructor(private portfolioService: PortfolioService, private store: Store<AppState>,
    private toastr: ToastrService, private storage: AngularFireStorage,
    private authService: AuthService) { }

  ngOnInit() {

    this.store.select('portfolio').subscribe(portfolio => {
      this.portfolios = portfolio.items;
      console.log(this.portfolios)
    });

    this.loadingSubscription = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    })

    this.portfolioForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'url': new FormControl('', Validators.required),
    })


  }

  sendPortfolio() {
    this.sendImg();
  }

  takeImg(event) {
    this.imgcontainer = event.target.files[0];
    this.areImg = true;
    this.user = this.authService.getUSer();
  }

  // add img to firebase and get the path
  sendImg() {
    let file = this.imgcontainer;
    let dateName = new Date().getTime();
    const filePath = `${this.user.uid}-${dateName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // upload image to server
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(x => {
          // Add new item
          this.store.dispatch(new ActivateLoadingAction);
          const PORTFOLIO = new PortfolioModel({ ...this.portfolioForm.value, img: x, imgName: this.user.uid + dateName.toString() });

          this.portfolioService.createPortfolio(PORTFOLIO).then(x => {
            this.toastr.success('Added', 'The item was added successfully!');
            this.store.dispatch(new DesactivateLoadingAction);
          }).catch(e => {
            this.toastr.error('Error', 'Something is wrong, try again later');
            this.store.dispatch(new DesactivateLoadingAction);
          });

          // Reset forms
          this.portfolioForm.setValue({
            name: '',
            url: '',
          })
        })
      })
    ).subscribe()
  }

  deletePortfolio(portfolio) {
    this.portfolioService.deletePortfolio(portfolio.uid);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
