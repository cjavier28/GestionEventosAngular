import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MatTableModule } from '@angular/material/table';  // Para mat-table
import { CommonModule } from '@angular/common';  // Para pipes como 'date'
import { provideRouter } from '@angular/router';  // Proveer el enrutador
import { routes } from './app.routes';  // Rutas de la aplicación
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimización de zona
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    MatTableModule,         // Agregar MatTableModule para usar tablas de Angular Material
    CommonModule,           // Agregar CommonModule para usar pipes como 'date'
  ]
};
