import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago.models'; 

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private baseUrl = 'http://localhost:3000/pagos';  

  constructor(private http: HttpClient) { }

  findPagosBySocio(socioId: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.baseUrl}/socio/${socioId}`);
  }

  actualizarPago(pagoId: number, pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.baseUrl}/${pagoId}`, pago);
  }
  
  findAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.baseUrl}`); // Ajusta la consulta según tu API
  }
}