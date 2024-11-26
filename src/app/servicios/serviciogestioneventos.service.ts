import { CrearEventoRequest } from './../swagger/gestioneventos/models/crear-evento-request';
import { Evento } from './../app/interfaces/interfaces';
import { EliminarEventoRequest, GestionEventosEve } from '../swagger/gestioneventos/models';
import { ServicioGestionEventosService } from '../swagger/gestioneventos/services';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciogestioneventosService {

  constructor(private serviciogestion:ServicioGestionEventosService) {

  }


/**
 *
 * @returns
 */
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



/**
 * Método para obtener un evento por su ID.
 * @param idevento El ID del evento a buscar.
 * @returns Una promesa que resuelve el evento o un error.
 */
async ObtenerGestionEventosPorId(idevento: number): Promise<any> {
  return new Promise((resolve, reject) => {
    this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;

    // Suponiendo que el servicio está esperando un parámetro de URL, la sintaxis correcta debería ser algo así
    this.serviciogestion.apiServicioGestionEventosIdGet({ id: idevento }).subscribe({
      next: (success) => {
        resolve(success);  // Resolver la promesa con la respuesta exitosa
      },
      error: (e) => {
        console.error(e);  // Muestra el error en la consola
        reject(e);  // Rechazar la promesa con el error
      }
    });
  });
}



/**
 * Método para eliminar un evento por su ID.
 * @param eliminarEventoRequest El objeto que contiene la información para eliminar el evento.
 * @returns Una promesa que resuelve el éxito o el error.
 */
async EliminarEventoPorId(eliminarEventoRequest: EliminarEventoRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;

    // Llamar al servicio y pasar el objeto eliminarEventoRequest en el cuerpo de la solicitud (request body)
    this.serviciogestion.apiServicioGestionEventosEliminarDelete({
      body: eliminarEventoRequest // El cuerpo de la solicitud es el objeto eliminarEventoRequest
    }).subscribe({
      next: (success) => {
        resolve(success);  // Resolver la promesa con la respuesta exitosa
      },
      error: (e) => {
        console.error(e);  // Muestra el error en la consola
        reject(e);  // Rechazar la promesa con el error
      }
    });
  });
}


/**
 *
 * @param crearEventoRequest
 * @returns
 */
  async InsertarEvento (crearEventoRequest:CrearEventoRequest){
    return new Promise(
      (resolve)=>{
        this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;
        this.serviciogestion
         .apiServicioGestionEventosCrearPost({body: crearEventoRequest})
         .subscribe({
          next:(success)=>{
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
