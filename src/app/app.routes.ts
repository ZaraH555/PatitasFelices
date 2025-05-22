import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta por defecto redirige a login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login y Registro (standalone)
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  // Rutas principales
  { 
    path: 'mascotas', 
    loadComponent: () => import('./components/mascotas/mascotas.component').then(m => m.MascotasComponent)
  },
  { 
    path: 'paseos', 
    loadComponent: () => import('./components/paseo-solicitud/paseo-solicitud.component').then(m => m.PaseoSolicitudComponent)
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

  // Ruta comodín (por si no existe)
  { path: '**', redirectTo: 'login' }
];

