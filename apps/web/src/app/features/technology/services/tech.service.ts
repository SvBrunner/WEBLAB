import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Technology} from '../technology.type';
import {CreateDraftTechnologyDto} from '../create-draft-technology.dto';
import {UpdateTechnologyDto} from '../update-technology.dto';
import {API_BASE_URL} from '../../../api-base-url.token';


@Injectable({providedIn: 'root'})
export class TechService {
  private readonly url = `${inject(API_BASE_URL)}/technologies`;

  constructor(private http: HttpClient) {
  }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.url);
  }

  getTechnology(id: string): Observable<Technology> {
    return this.http.get<Technology>(`${this.url}/${id}`);
  }

  addTechnology(dto: CreateDraftTechnologyDto): Observable<Technology> {
    return this.http.post<Technology>(this.url, dto);
  }

  createDraftTechnology(dto: CreateDraftTechnologyDto): Observable<Technology> {
    return this.http.post<Technology>(`${this.url}/draft`, dto);
  }

  updateTechnology(dto: UpdateTechnologyDto): Observable<Technology> {
    return this.http.put<Technology>(this.url, dto);
  }

  deleteTechnology(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  publish(id: string): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}/publish`, {});
  }
}
