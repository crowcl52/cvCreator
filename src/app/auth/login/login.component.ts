import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loading: boolean;

  constructor(public authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  onSubmit(data: any) {
    this.authService.logIn(data.email, data.password);
  }

}
