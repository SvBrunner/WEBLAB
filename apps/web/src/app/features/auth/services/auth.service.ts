import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {Role} from '../roles.type';
import {API_BASE_URL} from '../../../api-base-url.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  url = inject(API_BASE_URL);
  private _token$ = new BehaviorSubject<string | null>(null);

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
    this._token$.next(token);
  }

  hasRole(role: Role): boolean {
    const tkn: string | null = this._token$.value;

    if (tkn == null || !this.isTokenAuthenticated(tkn))
      return false;
    const jwt = jwtDecode(tkn);
    console.log(jwt)

    const roles: string[] = (jwt as any).roles ?? [];
    console.log(roles)
    return roles.includes(role)
  }

  isAuthenticatedObservable() {
    return this._token$.asObservable().pipe(
      map(token => {
        return this.isTokenAuthenticated(token);
      })
    );
  }

  private isTokenAuthenticated(token: string | null) {
    if (!token) return false;
    try {
      const jwt: any = jwtDecode(token);
      const exp = jwt.exp;
      if (typeof exp === 'number') {
        const now = Math.floor(Date.now() / 1000);
        if (exp < now) return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  isAuthenticated() {
    return this.isTokenAuthenticated(this._token$.value);
  }

  clear() {
    localStorage.removeItem('access_token');
    this._token$.next(null);
  }

  get token(): string | null {
    return this._token$.value;
  }

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this._token$.next(token);
    }
  }

  login(username: string, password: string) {
    return this.httpClient.post(`${this.url}/auth/login`, {username, password}, {observe: 'response'});
  }

}
