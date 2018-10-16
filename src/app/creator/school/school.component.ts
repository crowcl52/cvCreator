import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EducationModel } from '../models/education.model';
import { SchoolService } from '../school.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../../shared/ui.actions';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  showSchool: boolean = false;

  educationkForm: FormGroup;

  loadingSubscription: Subscription = new Subscription();
  loading: boolean = false;

  educations: EducationModel[] = [];


  constructor( private educationService: SchoolService, private store: Store<AppState>, private toastr: ToastrService ) { }

  ngOnInit() {

    this.store.select('education').subscribe(works => {
      this.educations = works.items;
    });

    this.loadingSubscription = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    })

    this.educationkForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'place': new FormControl('', Validators.required),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
    })
  }

  sendWork() {
    this.store.dispatch(new ActivateLoadingAction);
    const WORK = new EducationModel({ ...this.educationkForm.value });

    this.educationService.createEducation(WORK).then(x => {
      this.toastr.success('Added', 'The item was added successfully!');
      this.store.dispatch(new DesactivateLoadingAction);
    }).catch(e => {
      this.toastr.error('Error', 'Something is wrong, try again later');
      this.store.dispatch(new DesactivateLoadingAction);
    });

    // Reset forms
    this.educationkForm.setValue({
      title: '',
      place: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  deleteSchool(school){
    this.educationService.deleteWork(school.uid);
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

}
