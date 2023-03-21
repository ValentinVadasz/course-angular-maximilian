import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {User} from "../shared/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6Upw7JK6XBNR6F-f5BqJV7jrIi6cWT-I',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6Upw7JK6XBNR6F-f5BqJV7jrIi6cWT-I', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(resData => this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn)),
      catchError(this.handleError)
    );
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if(this.expirationTimer){
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const tokenExpiration = new Date(
      expiresIn + new Date().getTime() * 1000)
    const user = new User(
      email,
      localId,
      idToken,
      tokenExpiration
    );
    this.currentUser.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = "Wrong email or password";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
