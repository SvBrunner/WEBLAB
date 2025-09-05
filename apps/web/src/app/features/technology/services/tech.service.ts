import {Injectable} from '@angular/core';
import {Technology} from '../smart-container/technology.type';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TechService {

  url = 'http://localhost:3000/api/v1/technologies';

  constructor(private httpClient: HttpClient) {
  }


  getTechnologies(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this.url)
  }

  getTechnology(uuid: string): Observable<Technology> {
    return this.httpClient.get<Technology>(`${this.url}/${uuid}`)
  }

  addTechnology(tech: Technology): Observable<Object> {
    return this.httpClient.post(this.url, tech);
  }

  updateTechnology(tech: Technology): Observable<Object> {
    return this.httpClient.put(this.url, tech);
  }

  deleteTechnology(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
