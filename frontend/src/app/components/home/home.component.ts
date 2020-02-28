import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  loggedIn = false;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loggedIn = this.loginService.isLoggedin();
  }

}
