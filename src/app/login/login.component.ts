import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { AlertService} from '../alert.service';
import { AuthenticationService} from '../authentication.service';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any= {};
  loading= false;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
      // reset login status
    this.authenticationService.logout();
     // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          console.log('Login successfully');
          console.log(data.email);
          // localStorage.setItem('firstName', JSON.stringify(data.email));
          this.userService.showNavBar(true);
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  login22(f) {
    // debugger;

    this.userService.userLogin(
      {'email': this.model.email, 'password': this.model.password}
    ).subscribe(res => {
      // debugger
      if (res.json() == null) {
        console.log('Cannot find user');
      } else {
        console.log('Login successfully');
        localStorage.setItem('firstName', JSON.stringify(res.json().firstName));
        this.userService.showNavBar(true);
      }
    });
  }

}
