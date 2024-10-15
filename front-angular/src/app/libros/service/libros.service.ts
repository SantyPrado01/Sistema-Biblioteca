import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libros.models'; 

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private baseUrl = 'http://localhost:3000/libros';  // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) { }

  create(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.baseUrl, libro);
  }

  findAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}`);
  }

  findOne(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/${id}`);
  }

  update(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.baseUrl}/${id}`, libro);
  }
}