import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.routes')
      .then(m => m.authRoutes)
  },
  { 
    path: 'mascotas', 
    loadComponent: () => import('./components/mascotas/mascotas.component').then(m => m.MascotasComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'paseos', 
    loadComponent: () => import('./components/paseo-solicitud/paseo-solicitud.component').then(m => m.PaseoSolicitudComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'facturas', 
    loadComponent: () => import('./components/facturas/facturas.component').then(m => m.FacturasComponent)
  },
  { 
    path: 'confirmacion', 
    loadComponent: () => import('./components/confirmacion/confirmacion.component').then(m => m.ConfirmacionComponent)
  },
  { 
    path: 'paseos/confirmacion', 
    redirectTo: 'confirmacion', 
    pathMatch: 'full' 
  },
  { 
    path: 'restablecer/:token', 
    loadComponent: () => import('./auth/restablecer/restablecer.component').then(m => m.RestablecerComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
