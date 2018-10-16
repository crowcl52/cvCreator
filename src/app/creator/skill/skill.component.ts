import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SkillModel } from '../models/skill.model';
import { SkillService } from '../skill.service';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../../shared/ui.actions';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {

  showSkill: boolean = false;
  showLanguage: boolean = false;
  showTool: boolean = false;

  skillForm: FormGroup;
  lanForm: FormGroup;
  toolForm: FormGroup;

  loadingSubscription: Subscription = new Subscription();
  loading: boolean = false;

  skills: SkillModel[] = [];
  languages: SkillModel[] = [];
  tools: SkillModel[] = [];


  constructor(public skillService: SkillService, private toastr: ToastrService, 
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('skill').subscribe(skills => {
      this.skills = skills.items.filter(x => x.type == 'skill');
      this.languages = skills.items.filter(x => x.type == 'lan');
      this.tools = skills.items.filter(x => x.type == 'tool');
    });


    this.loadingSubscription = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    })

    this.skillForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'percentage': new FormControl(0, Validators.min(1)),
      'color': new FormControl('', Validators.required),
    })

    this.lanForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'percentage': new FormControl(0, Validators.min(1)),
      'color': new FormControl('', Validators.required),
    })

    this.toolForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'percentage': new FormControl(0, Validators.min(1)),
      'color': new FormControl('', Validators.required),
    })

  }

  // add new skill
  sendSkill(type) {

    this.store.dispatch(new ActivateLoadingAction);

    switch (type) {
      case 'skill':
        const SKILL = new SkillModel({ ...this.skillForm.value, type: type });

        this.skillService.createSkill(SKILL).then(x => {
          this.toastr.success('Added', 'The skill was added successfully!');
          this.store.dispatch(new DesactivateLoadingAction);
        }).catch(e => {
          this.toastr.error('Error', 'Something is wrong, try again later');
          this.store.dispatch(new DesactivateLoadingAction);
        });

        // Reset forms
        this.skillForm.setValue({
          'name': '',
          'percentage': 0,
          'color': ''
        });
        break;
      case 'lan':
        const LANGUAGE = new SkillModel({ ...this.lanForm.value, type: type });
        this.skillService.createSkill(LANGUAGE).then(x => {
          this.toastr.success('Added', 'The language was added successfully!');
          this.store.dispatch(new DesactivateLoadingAction);
        }).catch(e => {
          this.toastr.error('Error', 'Something is wrong, try again later');
          this.store.dispatch(new DesactivateLoadingAction);
        });
        // Reset forms
        this.lanForm.setValue({
          'name': '',
          'percentage': 0,
          'color': ''
        });
        break;
      case 'tool':
        const TOOL = new SkillModel({ ...this.toolForm.value, type: type })
        this.skillService.createSkill(TOOL).then(x => {
          this.toastr.success('Added', 'The tool was added successfully!');
          this.store.dispatch(new DesactivateLoadingAction);
        }).catch(e => {
          this.toastr.error('Error', 'Something is wrong, try again later');
          this.store.dispatch(new DesactivateLoadingAction);
        });
        // Reset forms
        this.toolForm.setValue({
          'name': '',
          'percentage': 0,
          'color': ''
        });
        break;
    }

  }

  setBgColor(color) {
    switch (color) {
      case 'primary':
        return 'bg-primary';
      case 'white':
        return 'bg-white';
      case 'secondary':
        return 'bg-secondary';
      case 'success':
        return 'bg-success';
      case 'danger':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      case 'info':
        return 'bg-info';
      case 'light':
        return 'bg-light';
      case 'dark':
        return 'bg-dark';
      default:
        return 'bg-primary';
    }
  }

  deleteSkill(skill){
    this.skillService.deleteSkill(skill.uid);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }


}
