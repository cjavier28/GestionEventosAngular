import { GestionEventosEve } from '../swagger/gestioneventos/models';
import { ServicioGestionEventosService } from '../swagger/gestioneventos/services';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciogestioneventosService {

  constructor(private serviciogestion:ServicioGestionEventosService) {

  }



  async ObtenerGestionEventos(){
    return new Promise<Array<GestionEventosEve>>(
      (resolve)=>{
        this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;
        this.serviciogestion
         .apiServicioGestionEventosListarEventosGet()
         .subscribe({
          next:(success:Array<GestionEventosEve>)=>{
            resolve(success);
          },
          error:(e)=>{
            resolve(e.console.error);
          }
         })
      }
    )
  }


}
