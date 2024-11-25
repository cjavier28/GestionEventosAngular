import { Routes } from "@angular/router";
import { ListargestioneventosComponent } from "./componentes/listargestioneventos/listargestioneventos.component";
import { InscribireventoComponent } from "./componentes/inscribirevento/inscribirevento.component";

export const routes: Routes = [

  { path: '', component: ListargestioneventosComponent },

  { path: 'inscribir', component: InscribireventoComponent },
  // Otras rutas de tu aplicación
];
