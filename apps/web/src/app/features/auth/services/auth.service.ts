import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  url = 'http://localhost:3000/api/v1';
  private _token$ = new BehaviorSubject<string | null>(null);
  token$ = this._token$.asObservable();

  setAccessToken(token: string) {
    console.log(this._token$.value)
    this._token$.next(token);
  }

  clear() {
    this._token$.next(null);
  }

  get token(): string | null {
    console.log(this._token$.value)
    return this._token$.value;
  }

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    return this.httpClient.post(`${this.url}/auth/login`, {username, password}, {observe: 'response'});
  }

}
