import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehiculo } from '../interfaces/vehiculo.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = 'http://localhost:8000/vehiculos/'; // URL base para la API
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

  // Obtener todos los vehículos
  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Crear un nuevo vehículo
  createVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.apiUrl, vehiculo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Actualizar un vehículo existente
  updateVehiculo(id: number, vehiculo: Vehiculo): Observable<Vehiculo> {
    const url = `${this.apiUrl}${id}`;
    return this.http.put<Vehiculo>(url, vehiculo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Eliminar un vehículo
  deleteVehiculo(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Obtener un vehículo por ID
  getVehiculoById(id: number): Observable<Vehiculo> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Vehiculo>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Buscar vehículos por diversos criterios
  searchVehiculos(params: { [key: string]: any }): Observable<Vehiculo[]> {
    let queryParams = new HttpParams();
    
    for (const key in params) {
      if (params[key] !== null && params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key]);
      }
    }
    
    return this.http.get<Vehiculo[]>(this.apiUrl, { 
      headers: this.httpOptions.headers, 
      params: queryParams 
    }).pipe(catchError(this.handleError));
  }
}
