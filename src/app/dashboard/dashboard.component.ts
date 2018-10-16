import { Component, OnInit } from '@angular/core';
import { SkillService } from '../creator/skill.service';
import { WorkService } from '../creator/work.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( public skillService: SkillService, 
               public workService: WorkService) { }

  ngOnInit() {

    this.skillService.initSkillListener();
    this.workService.initWorkListener();
  }

}
