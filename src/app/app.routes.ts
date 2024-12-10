import { Routes } from '@angular/router';
import { ExamsComponent } from './exams/exams.component';

export const routes: Routes = [
  { path: 'exams', component: ExamsComponent }, // Route pour accéder à ExamsComponent
  { path: '', redirectTo: '/exams', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/exams' },
];
