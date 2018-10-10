import { Routes } from "@angular/router";
import { InfoComponent } from "../creator/info/info.component";
import { SkillComponent } from "../creator/skill/skill.component";
import { WorkComponent } from "../creator/work/work.component";
import { SchoolComponent } from "../creator/school/school.component";
import { PortfolioComponent } from "../creator/portfolio/portfolio.component";


export const DASHBOARDROUTES: Routes = [
    {path:'', component: InfoComponent},
    {path:'skill', component: SkillComponent},
    {path:'work', component: WorkComponent},
    {path:'education', component: SchoolComponent},
    {path:'portfolio', component: PortfolioComponent}
]