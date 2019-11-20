import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(public authenticationService: AuthService) {}

  ngOnInit() {
  }

  signIn( username, password) {
 this.authenticationService.SignIn(username, password);
  }

}
