import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { TitularService } from '../../services/titular.service';
import { Vehiculo } from '../../interfaces/vehiculo.interface';
import { Titular } from '../../interfaces/titular.interface';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  titulares: Titular[] = [];
  selectedVehiculo: Vehiculo = {} as Vehiculo;
  isEditing = false;

  constructor(
    private vehiculoService: VehiculoService,
    private titularService: TitularService
  ) {}

  ngOnInit(): void {
    this.loadVehiculos();
    this.loadTitulares();
  }

  loadVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe(
      (data) => (this.vehiculos = data),
      (error) => console.error(error)
    );
  }

  loadTitulares(): void {
    this.titularService.getTitulares().subscribe(
      (data) => (this.titulares = data),
      (error) => console.error(error)
    );
  }

  createVehiculo(): void {
    this.vehiculoService.createVehiculo(this.selectedVehiculo).subscribe(
      () => {
        this.loadVehiculos();
        this.selectedVehiculo = {} as Vehiculo;
      },
      (error) => console.error(error)
    );
  }

  updateVehiculo(): void {
    if (this.selectedVehiculo.id) {
      this.vehiculoService.updateVehiculo(this.selectedVehiculo.id, this.selectedVehiculo).subscribe(
        () => {
          this.loadVehiculos();
          this.cancelEdit();
        },
        (error) => console.error(error)
      );
    }
  }

  editVehiculo(vehiculo: Vehiculo): void {
    this.selectedVehiculo = { ...vehiculo };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedVehiculo = {} as Vehiculo;
    this.isEditing = false;
  }

  deleteVehiculo(id: number | undefined): void {
    if (id) {
      if (confirm('¿Está seguro de eliminar este vehículo?')) {
        this.vehiculoService.deleteVehiculo(id).subscribe(
          () => this.loadVehiculos(),
          (error) => console.error(error)
        );
      }
    }
  }

  getTitularNombre(titularId: number): string {
    const titular = this.titulares.find((t) => t.id === titularId);
    return titular ? `${titular.nombre} ${titular.apellido}` : 'N/A';
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateVehiculo();
    } else {
      this.createVehiculo();
    }
  }
}
