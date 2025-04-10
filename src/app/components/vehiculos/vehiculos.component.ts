import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../interfaces/vehiculo.interface';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  selectedVehiculo: Vehiculo = {} as Vehiculo;
  isEditing = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit(): void {
    this.loadVehiculos();
  }

  loadVehiculos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los vehículos: ' + error.message;
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  createVehiculo(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    console.log('Enviando vehículo:', this.selectedVehiculo); // <-- útil para depuración
  
    this.vehiculoService.createVehiculo(this.selectedVehiculo).subscribe({
      next: () => {
        this.loadVehiculos(); // Usamos el helper
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el vehículo: ' + error.message;
        this.isLoading = false;
        console.error('Error del backend:', error);
      }
    });
  }
  

  updateVehiculo(): void {
    if (this.selectedVehiculo.id) {
      this.isLoading = true;
      this.errorMessage = '';
      this.vehiculoService.updateVehiculo(this.selectedVehiculo.id, this.selectedVehiculo).subscribe({
        next: () => {
          this.loadVehiculos();
          this.cancelEdit();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el vehículo: ' + error.message;
          this.isLoading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  editVehiculo(vehiculo: Vehiculo): void {
    this.selectedVehiculo = { ...vehiculo };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedVehiculo = {} as Vehiculo;
    this.isEditing = false;
    this.errorMessage = '';
  }

  deleteVehiculo(id: number | undefined): void {
    if (id) {
      if (confirm('¿Está seguro de eliminar este vehículo?')) {
        this.isLoading = true;
        this.errorMessage = '';
        this.vehiculoService.deleteVehiculo(id).subscribe({
          next: () => {
            this.loadVehiculos();
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Error al eliminar el vehículo: ' + error.message;
            this.isLoading = false;
            console.error('Error:', error);
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateVehiculo();
    } else {
      this.createVehiculo();
    }
  }
}
