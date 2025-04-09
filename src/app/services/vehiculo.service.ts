import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private baseUrl = API_CONFIG.baseUrl;
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
    const url = `${this.baseUrl}${API_CONFIG.vehiculosOperations.getAll}`;
    return this.http.get<Vehiculo[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Crear un nuevo vehículo
  createVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    const url = `${this.baseUrl}${API_CONFIG.vehiculosOperations.create}`;
    return this.http.post<Vehiculo>(url, vehiculo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Actualizar un vehículo existente
  updateVehiculo(id: number, vehiculo: Vehiculo): Observable<Vehiculo> {
    const url = `${this.baseUrl}${API_CONFIG.vehiculosOperations.update.replace(':id', id.toString())}`;
    return this.http.put<Vehiculo>(url, vehiculo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Eliminar un vehículo
  deleteVehiculo(id: number): Observable<void> {
    const url = `${this.baseUrl}${API_CONFIG.vehiculosOperations.delete.replace(':id', id.toString())}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Obtener un vehículo por ID
  getVehiculoById(id: number): Observable<Vehiculo> {
    const url = `${this.baseUrl}${API_CONFIG.vehiculosOperations.getById.replace(':id', id.toString())}`;
    return this.http.get<Vehiculo>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
