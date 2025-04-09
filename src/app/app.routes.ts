import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { TitularesComponent } from './components/titulares/titulares.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'titulares', component: TitularesComponent },
  { path: '**', redirectTo: '' }
];