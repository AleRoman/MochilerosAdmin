import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  constructor( public authenticationService: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.authenticationService.SignOut();
  }

}
