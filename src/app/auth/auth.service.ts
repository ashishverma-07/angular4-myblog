import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; //to store the token in the cookie
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authObservable: Subject<any> = new Subject(); //persisting user authentication

  constructor(private _http: HttpClient, private _router: Router,
    private _cookieService: CookieService) { }

  registration(regdetails: any) {
    this._http.post('http://localhost:3000/registration', regdetails).subscribe((data: any) => {
      console.log(data);
      if (data.isRegistered) {
        this._router.navigate(['/login']);
      }
    });
  }

  login(logindetails: any) {
    console.log(logindetails);
    this._http.post('http://localhost:3000/authenticate', logindetails).subscribe((data: any) => {
      console.log(data);
      if (data.isRegistered) {
        this._cookieService.set('token', data.token);
        this.$authObservable.next(data.token);
        this._router.navigate(['/home']);
      } else {
        alert('Invalid credentials!!!');
      }
    });
  }

  logout() {
    this._cookieService.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }

  checkUserStatus() {
    return this._cookieService.get('token');
  }


}
