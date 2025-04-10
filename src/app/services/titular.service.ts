import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Titular } from '../interfaces/titular.interface';

@Injectable({
  providedIn: 'root'
})
export class TitularService {
  private apiUrl = 'http://localhost:8000/titulares/'; // URL base para la API de titulares
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error en la operación';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getTitulares(): Observable<Titular[]> {
    return this.http.get<Titular[]>(this.apiUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  createTitular(titular: Titular): Observable<Titular> {
    return this.http.post<Titular>(this.apiUrl, titular, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateTitular(id: number, titular: Titular): Observable<Titular> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<Titular>(url, titular, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteTitular(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
