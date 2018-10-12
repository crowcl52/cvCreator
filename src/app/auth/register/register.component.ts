import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean;

  constructor( public authService: AuthService, public store:Store<AppState> ) { }

  ngOnInit() {
    this.store.select('ui').subscribe(ui=> this.loading = ui.isLoading);
  }

  onSubmit(data: any){
    this.authService.createUSer(data.email,data.user,data.password);
  }

}
