import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
// import {Http} from '@angular/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User} from './_models/index';




@Injectable()
export class UserService {
  url = 'http://localhost:8088/user';
  userStatus = 0;
  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();
  constructor(private http: Http) { }

  userRegister(registerData) {
    return this.http.post(this.url + '/register', registerData);
  }

  userLogin(loginData) {
    return this.http.post(this.url + '/login', loginData);
  }

  checklogin(checkloginData) {
    return this.http.post(this.url + '/checklogin', checkloginData);
  }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }
  getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }
  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
     const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
