import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  status: string;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(private http: HttpClient, private router: Router) {
  }

  login() {
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);

    const body = {
      username: this.username,
      password: this.password,
    };
    // optional
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        this.router.navigate(['front']);
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
      });
  }

  register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  upload(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  getNewFiles() {
    return this.http.get(this.apiUrl + '/media?start=&limit=10');
  }

  getOneFile() {
    return this.http.get(this.apiUrl + '/media?start=&limit=1');
  }

  postingUser(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/users/:id', settings);
  }

  getLikes(id) {
    return this.http.get(this.apiUrl + '/favourites/file/:id', id);
  }

  likedByUser() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/favourites', settings);
  }
}
