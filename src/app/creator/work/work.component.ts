import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkService } from '../work.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { WorkModel } from '../models/work.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../../shared/ui.actions';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, OnDestroy {

  showWork: boolean = false;

  workForm: FormGroup;

  loadingSubscription: Subscription = new Subscription();
  loading: boolean = false;

  works: WorkModel[] = [];

  constructor(private workService: WorkService, private store: Store<AppState>, private toastr: ToastrService, ) { }

  ngOnInit() {

    this.store.select('work').subscribe(works => {
      this.works = works.items;
    });

    this.loadingSubscription = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    })

    this.workForm = new FormGroup({
      'position': new FormControl('', Validators.required),
      'place': new FormControl('', Validators.required),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
    })
  }

  sendWork() {
    this.store.dispatch(new ActivateLoadingAction);
    const WORK = new WorkModel({ ...this.workForm.value });

    this.workService.createWork(WORK).then(x => {
      this.toastr.success('Added', 'The work was added successfully!');
      this.store.dispatch(new DesactivateLoadingAction);
    }).catch(e => {
      this.toastr.error('Error', 'Something is wrong, try again later');
      this.store.dispatch(new DesactivateLoadingAction);
    });

    // Reset forms
    this.workForm.setValue({
      position: '',
      place: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  deleteWork(work){
    this.workService.deleteWork(work.uid);
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

}
