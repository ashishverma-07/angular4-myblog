import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req, next) {
    var token = this._authService.checkUserStatus(),
      authRequest = req.clone({
        headers: new HttpHeaders().set('authtoken', token)
      });
    return next.handle(authRequest);
  }
}
