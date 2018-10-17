import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uid: any;

  constructor( private authService: AuthService, private router:Router,private store: Store<AppState> ) { }

  ngOnInit() {

    this.store.select('auth').subscribe(user=>{
      if(user.user != null){
       this.uid = user.user.uid;
      }
    })
  }
  showSide(){
    document.querySelector("#sidebar").classList.toggle("hide");
  }

  logout(){
    this.authService.logout();
  }

}
