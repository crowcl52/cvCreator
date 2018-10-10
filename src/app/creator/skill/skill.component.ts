import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  addSkill: boolean = false;
  addLanguage: boolean = false;
  addTool: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
