import {Injectable} from '@angular/core';
import {Technology} from '../smart-container/technology.type';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TechService {

  url = 'http://localhost:3000/technologies';

  constructor(private httpClient: HttpClient) {
  }


  getTechnologies(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this.url)
  }

  addTechnology(tech: Technology) {

    console.log(`Create new  ${tech}`)
  }
}
