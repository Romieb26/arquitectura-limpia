import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titular } from '../interfaces/titular.interface';

@Injectable({
  providedIn: 'root'
})
export class TitularService {
  private apiUrl = 'http://localhost:3000/titulares'; // Ajusta si usas otro backend

  constructor(private http: HttpClient) {}

  getTitulares(): Observable<Titular[]> {
    return this.http.get<Titular[]>(this.apiUrl);
  }
  
  createTitular(titular: Titular): Observable<Titular> {
    return this.http.post<Titular>(this.apiUrl, titular);
  }

  updateTitular(id: number, titular: Titular): Observable<Titular> {
    return this.http.put<Titular>(`${this.apiUrl}/${id}`, titular);
  }

  deleteTitular(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
