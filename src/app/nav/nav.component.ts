import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {UserService} from '../user.service';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginStatus = 0;
  username = '';
  constructor(private router: Router,
              private userService: UserService) {
    this.userService.showNavBarEmitter.subscribe(mode => {
      if (mode !== null) {
        this.loginStatus = 1;
        let tmpName = localStorage.getItem('currentUser');

        this.username = JSON.parse(tmpName).firstName;
        console.log(this.username);
        this.router.navigate(['/home'], {skipLocationChange: false});

      }
    });
  }

  ngOnInit() {

  }
  signOut() {
    this.userService.showNavBar(true);
    this.userService.showNavBarEmitter.subscribe(mode => {
      localStorage.setItem('firstName', '');
      this.loginStatus = 0;

    });
  }
}
