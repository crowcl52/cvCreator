import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewService } from './view.service';
import { SkillModel } from '../creator/models/skill.model';
import { InfoModel } from '../creator/models/info.model';
import { WorkModel } from '../creator/models/work.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private viewService: ViewService) { }
  skills = [];
  languages = [];
  tools = [];
  info: InfoModel = {
    image: '',
    name: 'John Doe',
    title: 'Engineer',
    email: 'mail@mail.com',
    country: 'México',
    city: 'Guadalajara',
    age: 18,
    phone: '333333333',
    facebook: null,
    twitter: null,
    instagram: null,
    pinterest: null,
    linkedin: null,
    github: null,
    bgColor: 'light',
    contColor: 'white',
    titleColor: 'dark',
    txtColor: 'dark',
    fooColor: 'secondary',
    socColor: 'info',
    iconColor: 'info',
  };

  works: WorkModel[] = [];
  educations = [];
  portfolios = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['id'];
      // get info
      this.viewService.InfoItem(uid).subscribe((info: InfoModel) => {
        this.info = { ...info };
      })
      // get skills
      this.viewService.skillItems(uid).subscribe((data: any[]) => {
        this.skills = data.filter(x => x.type == 'skill')
        this.languages = data.filter(x => x.type == 'lan')
        this.tools = data.filter(x => x.type == 'tool')
      });
      // get work
      this.viewService.workItems(uid).subscribe( (work: any[])=>{
        this.works = work;
      });
      // get education
      this.viewService.educationItems(uid).subscribe( education=>{
        this.educations = education;
      });
      // get portfolio
      this.viewService.portfolioItems(uid).subscribe( portfolio=>{
        this.portfolios = portfolio;
      });

    });
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

  setTxtColor(color) {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'white':
        return 'text-white';
      case 'secondary':
        return 'text-secondary';
      case 'success':
        return 'text-success';
      case 'danger':
        return 'text-danger';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-info';
      case 'light':
        return 'text-light';
      case 'dark':
        return 'text-dark';
      default:
        return 'text-primary';
    }
  }


}
