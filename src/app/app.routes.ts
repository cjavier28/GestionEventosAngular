import { Routes } from "@angular/router";
import { ListargestioneventosComponent } from "./componentes/listargestioneventos/listargestioneventos.component";
import { InscribireventoComponent } from "./componentes/inscribirevento/inscribirevento.component";
import { LoginusuarioComponent } from "./componentes/loginusuario/loginusuario.component";

export const routes: Routes = [

  { path: '', component: LoginusuarioComponent },
  { path: 'inscribir', component: InscribireventoComponent },
  { path: 'listar', component: ListargestioneventosComponent },

  // Otras rutas de tu aplicación
];
