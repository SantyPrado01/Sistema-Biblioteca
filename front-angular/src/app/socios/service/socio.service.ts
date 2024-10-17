import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socio } from '../models/socios.models';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private baseUrl = 'http://localhost:3000/socios';  

  constructor(private http: HttpClient) { }

  create(socio: Socio): Observable<Socio> {
    return this.http.post<Socio>(this.baseUrl, socio);
  }

  findAll(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.baseUrl}`);
  }

  findOne(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.baseUrl}/${id}`);
  }

  update(id: number, socio: Socio): Observable<Socio> {
    return this.http.put<Socio>(`${this.baseUrl}/${id}`, socio);
  }
}