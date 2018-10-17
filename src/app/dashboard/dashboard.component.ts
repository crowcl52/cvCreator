import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SkillService } from '../creator/skill.service';
import { WorkService } from '../creator/work.service';
import { SchoolService } from '../creator/school.service';
import { PortfolioService } from '../creator/portfolio.service';
import { InfoService } from '../creator/info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  constructor( public skillService: SkillService, 
               public workService: WorkService,
               public educationService: SchoolService,
               public portfolioService: PortfolioService,
               public infoService: InfoService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.skillService.initSkillListener();
    this.workService.initWorkListener();
    this.educationService.initEducationListener();
    this.portfolioService.initPortfolioListener();
    this.infoService.initInfoListener();
  }

}
