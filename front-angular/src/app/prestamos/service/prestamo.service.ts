import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Prestamo } from '../models/prestamo.models';
import { Libro } from '../../libros/models/libros.models';


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private baseUrl = 'http://localhost:3000/prestamos'; 

  constructor(private http: HttpClient) { }

  create(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.baseUrl, prestamo);
  }

  findAll(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.baseUrl}`);
  }

  findOne(prestamoId: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.baseUrl}/${prestamoId}`);
  }

  update(prestamoId: number, prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.baseUrl}/${prestamoId}`, prestamo);
  }

  private libroSeleccionadoSource = new Subject<Libro>();
  libroSeleccionado$ = this.libroSeleccionadoSource.asObservable();

  seleccionarLibro(libro: Libro) {
    this.libroSeleccionadoSource.next(libro);
  }

}