import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'restablecer/:token',
    loadComponent: () => import('./restablecer/restablecer.component')
      .then(m => m.RestablecerComponent)
  }
];
