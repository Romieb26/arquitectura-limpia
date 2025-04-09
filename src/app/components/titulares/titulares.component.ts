import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitularService } from '../../services/titular.service';
import { Titular } from '../../interfaces/titular.interface';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TitularesComponent implements OnInit {
  titulares: Titular[] = [];
  selectedTitular: Titular = {} as Titular;
  isEditing = false;

  constructor(private titularService: TitularService) { }

  ngOnInit(): void {
    this.loadTitulares();
  }

  loadTitulares(): void {
    this.titularService.getTitulares().subscribe(
      data => this.titulares = data,
      error => console.error(error)
    );
  }

  createTitular(): void {
    this.titularService.createTitular(this.selectedTitular).subscribe(
      () => {
        this.loadTitulares();
        this.selectedTitular = {} as Titular;
      },
      error => console.error(error)
    );
  }

  updateTitular(): void {
    if (this.selectedTitular.id) {
      this.titularService.updateTitular(this.selectedTitular.id, this.selectedTitular).subscribe(
        () => {
          this.loadTitulares();
          this.cancelEdit();
        },
        error => console.error(error)
      );
    }
  }

  editTitular(titular: Titular): void {
    this.selectedTitular = { ...titular };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedTitular = {} as Titular;
    this.isEditing = false;
  }

  deleteTitular(id: number | undefined): void {
    if (id) {
      if (confirm('¿Está seguro de eliminar este titular?')) {
        this.titularService.deleteTitular(id).subscribe(
          () => this.loadTitulares(),
          (error) => console.error(error)
        );
      }
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateTitular();
    } else {
      this.createTitular();
    }
  }
}
