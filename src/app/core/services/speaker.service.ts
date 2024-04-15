import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Speaker } from './state/models/speaker.model';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private apiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  getSpeakers(page: number, resultsPerPage: number): Observable<Speaker[]> {
    const url = `${this.apiUrl}?results=${resultsPerPage}&page=${page}`;
    return this.http.get<Speaker[]>(url).pipe(map((response: any) => response.results));
  }
}
